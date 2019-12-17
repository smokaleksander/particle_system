//canvas init
const canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var context=canvas.getContext('2d');

class Particle{
    constructor(x,y,vx,vy){
        //values init
        this.pos=new PVector(x,y);
        this.v =new PVector(vx,vy);
        this.a =new PVector(0,0.05);
        this.m=2;
        this.life_time=1;
        this.radius=5;
    }
    update(){
        this.v.add(this.a);
        this.pos.add(this.v);
        this.life_time-=0.008;
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
        if (this.timeToLive < 0) {
            return true;
        } else {
            return false;
        }
    }
    run(){
        this.update();
        this.draw();
    }
} 

class Emiter{
    constructor(){
        this.pos=this.pos=new PVector(window.innerWidth/2,window.innerHeight*0.2)
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
                particles.splice(i, 1);
            }
        }
    }
}
var emiter=new Emiter();
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,innerWidth, innerHeight);
    emiter.run();
    emiter.addParticle();
};

animate();