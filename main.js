//canvas init
const canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var context=canvas.getContext('2d');


window.addEventListener('resize',function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
})
class Particle{
    constructor(x,y,vx,vy){
        //values init
        this.pos=new PVector(x,y);
        this.v =new PVector(vx,vy);
        this.a =new PVector(0,0);
        this.m=(Math.random() * 15) +5;
        this.life_time=1;
        this.radius=5;
    }
    update(){
        this.v.add(this.a);
        this.pos.add(this.v);
        this.a.mult(0);
        this.life_time-=0.002;
    }
    draw(){
        context.beginPath();
        context.arc(this.pos.x,this.pos.y,this.radius,0,Math.PI * 2,false);
        context.shadowColor ='rgba(0, 136, 255,1)';
        context.shadowBlur = 20;
        context.fillStyle='rgba(0, 136, 255,1)';
        context.strokeStyle='rgba(0, 136, 255,1)';
        context.globalAlpha=this.life_time;
        context.fill();
        context.stroke();
    }
    isDead(){
        if (this.life_time < 0) {
            return true;
        } else {
            return false;
        }
    }
    force_apply(force){
        var f = force.get();
        f.div(this.m);
        this.a.add(f);
    }
    run(){
        this.update();
        this.draw();
    }
} 

class Emiter{
    constructor(){
        this.pos=this.pos=new PVector(window.innerWidth/2,window.innerHeight/2);
        this.particles=[];
    }

    addParticle(){
        this.particles.push(new Particle(this.pos.x,this.pos.y,(Math.random() * 2) -1,(Math.random() * 2) -1));
    }
    run(){
        for (var i = this.particles.length-1; i >= 0; i--) {
            var p = this.particles[i];
            p.run();
            if (p.isDead()) {
                p=null;
                this.particles.splice(i, 1);
            }
        }
    }
    addAttractor(attr){
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            var force = attr.force_calc(p);
            p.force_apply(force);
        }
    }
}

class Attractor{
    constructor(){
        this.pos=new PVector(window.innerWidth/2,window.innerHeight/2);
        this.power=100;
        
    }
    force_calc(particle){
        // Calculate direction of force
        var dir = PVector.sub(this.pos, particle.pos); 
        // Distance between objects
        var d = dir.mag();
        // Normalize direction vector 
        dir.normalize();
        // Keep distance within a reasonable range
        //d = constrain(d, 1, 100);    
        // Repelling force is inversely proportional to distance
        if (d>15){
            var force = this.power/ (d * d);  
        }else{
            var force=0;
        }     
        // Get force vector --> magnitude * direction
        dir.mult(force);                                  
        return dir;
    }
    
}
var emiter=new Emiter();
var attr=new Attractor();
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,innerWidth, innerHeight);

    context.beginPath();
        context.arc(window.innerWidth/2,window.innerHeight/2,10,0,Math.PI * 2,false);
        context.shadowColor ='red';
        context.shadowBlur = 20;
        context.fillStyle='red';
        context.strokeStyle='red';
        context.globalAlpha=1;
        context.fill();
        context.stroke();

    emiter.addAttractor(attr);
    emiter.addParticle();
    emiter.run();
    
    
};

animate();