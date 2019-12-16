//responsive
//var windowHeight = document.getElementById('box').clientHeight -20;
//var windowWidth = document.getElementById('box').clientWidth -20;

//canvas init
const canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var context=canvas.getContext('2d');

context.beginPath();
context.arc(300,300,10,0,Math.PI * 2,false);
context.shadowColor ='rgba(0, 136, 255,1)';
context.shadowBlur = 20;
context.fillStyle='rgba(0, 136, 255,1)';
context.strokeStyle='rgba(0, 136, 255,1)';
context.fill();
context.stroke();

class Particle{
    constructor(id,x,y,vx,vy,m){
        //values init
        this.pos=new PVector(x,y);
        this.v =new PVector(vx,vy);
        this.a =new PVector(0,0);
        this.id=id;
        this.m=m;
        this.life_time=255;
        //html object creation
        var new_disk =document.createElement("div");
        new_disk.className = "Disc";
        new_disk.id =id;
        new_disk.style.right=x+"px";
        new_disk.style.top=y+"px";
        new_disk.style.opacity=this.life_time/255
        document.getElementById("box").appendChild(new_disk)
    }
    isDead(){
        if (this.timeToLive < 0) {
            return true;
        } else {
            return false;
        }
    }
    //radnom color set
    set_color(){
        document.getElementById(this.id).style.backgroundColor = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
    }
    update(){
        //euler simplified
        //v=v+a*t
        this.a.mult(t);
        this.v.add(this.a);
        //x=x+a*t
        this.v.mult(t);
        this.pos.add(this.v);
        this.life_time-=0.1;
        //setting html pos 
        document.getElementById(this.id).style.top=this.pos.y+"px";
        document.getElementById(this.id).style.right=this.pos.x+"px";
        document.getElementById(this.id).style.opacity=this.life_time/255
        this.a.mult(0);
    }
    force_field(){
        var force_pos=new PVector(470,470);
        var force_mass=10;
        var force_g=8;
        //direction of force
        var force= PVector.sub(force_pos,this.pos);
        //distance between objects
        var r =force.mag();
        //normalize voctor
        force.normalize();
        //var strength = force_g * force_mass * this.m / (r* r);
        var strength=0;
        //central gravity force F=G*M*M/(r*r)
        if (r>20){
            strength = force_g * force_mass * this.m / (r* r);
        }
        //force vector= force*vector
        force.mult(strength);
        //a=f/m
        var ap = PVector.div(force,this.m);
        this.a.add(ap);
    }
    run(){
        //check distance to  borders
        //check gefore move if pos plus next step will be outside border
        if (this.pos.x+(this.v.x*t)>windowWidth){
            //distance to border
            var s=Math.abs(this.pos.x+(this.v.x*t)-windowWidth);
            //time needed to reach the border smaller than time step
            var tp =s/this.v.x;
            //move to the border in the part of time
            this.pos.x=this.pos.x+(this.v.x*tp);
            //reverse v.x vector to opposite direction
            this.v.x*=-1;
            //move to the opposite dirrection using rest time of step
            this.pos.x=this.pos.x+(this.v.x*(t-tp));
            //move in y direction
            //BUT need to add check to to prevent getting stuck in the corner
            if(this.pos.y+(this.v.y*t)>windowHeight || this.pos.y+(this.v.y*t)<0 ){
                var s=Math.abs(this.pos.y+(this.v.y*t)-windowHeight);
                var tp =s/this.v.y;
                this.pos.y=this.pos.y+(this.v.y*tp);
                this.v.y*=-1;
                this.pos.y=this.pos.y+(this.v.y*(t-tp));
            }else{
                this.pos.y=this.pos.y+(this.v.y*t);
            }
        }else if (this.pos.x+(this.v.x*t)<0){
            var s=Math.abs(this.pos.x+(this.v.x*t)-0);
            var tp =s/this.v.x;
            this.pos.x=this.pos.x+(this.v.x*tp);
            this.v.x*=-1;
            this.pos.x=this.pos.x+(this.v.x*(t-tp))
            this.pos.y=this.pos.y+(this.v.y*t);
            if(this.pos.y+(this.v.y*t)>windowHeight || this.pos.y+(this.v.y*t)<0 ){
                var s=Math.abs(this.pos.y+(this.v.y*t)-windowHeight);
                var tp =s/this.v.y;
                this.pos.y=this.pos.y+(this.v.y*tp);
                this.v.y*=-1;
                this.pos.y=this.pos.y+(this.v.y*(t-tp));
            }else{
                this.pos.y=this.pos.y+(this.v.y*t);
            }
        }else if(this.pos.y+(this.v.y*t)>windowHeight){
            var s=Math.abs(this.pos.y+(this.v.y*t)-windowHeight);
            var tp =s/this.v.y;
            this.pos.y=this.pos.y+(this.v.y*tp);
            this.v.y*=-1;
            this.pos.y=this.pos.y+(this.v.y*(t-tp));
            if (this.pos.x+(this.v.x*t)<0 || this.pos.x+(this.v.x*t)>windowWidth){
                var s=Math.abs(this.pos.x+(this.v.x*t)-0);
                var tp =s/this.v.x;
                this.pos.x=this.pos.x+(this.v.x*tp);
                this.v.x*=-1;
                this.pos.x=this.pos.x+(this.v.x*(t-tp))
                }else{
                    this.pos.x=this.pos.x+(this.v.x*t);
                }
        }else if(this.pos.y+(this.v.y*t)<0){
            var s=Math.abs(this.pos.y+(this.v.y*t)-0);
            var tp =s/this.v.y;
            this.pos.y=this.pos.y+(this.v.y*tp);
            this.v.y*=-1;
            this.pos.y=this.pos.y+(this.v.y*(t-tp));
            if (this.pos.x+(this.v.x*t)<0 || this.pos.x+(this.v.x*t)>windowWidth){
                var s=Math.abs(this.pos.x+(this.v.x*t)-0);
                var tp =s/this.v.x;
                this.pos.x=this.pos.x+(this.v.x*tp);
                this.v.x*=-1;
                this.pos.x=this.pos.x+(this.v.x*(t-tp))
            }else{
                this.pos.x=this.pos.x+(this.v.x*t);
            }
        }else{
            this.force_field();
            this.update();
        }
    }
} 
/*
time value stamp
var t=1 //ms

//discs initialization
var i;
var discs_array =[];
for (i = 0; i < 100; i++) {
    var temp=new Particle(i,Math.random()*200,Math.random()*200,Math.random()*2,Math.random()*2,Math.random()*10);
    temp.set_color();
    discs_array.push(temp);
}

var interval_timer;
function starter() {
    interval_timer = setInterval(function(){
        for (obj of discs_array) {
            obj.run();

        }
    }, t);
}
starter();
//requestanimationframe html5
*/
