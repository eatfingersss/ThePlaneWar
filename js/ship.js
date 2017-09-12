name=["up","down","left","right","fire"];
function Ship(name,color,up,down,left,right,fire,Position_x,Position_y){
    if(Position_x===undefined) Position_x=0;
    if(Position_y===undefined) Position_y=0;
    this.KeySet(up,down,left,right,fire);
    this.name=name;
    this.color=color;
    this.health=100;
    this.x=Position_x;
    this.y=Position_y;
    this.width=40;
    this.height=16;
    this.rotation=0;//角度
    this.showFlame=0;//推进1、停止状态
    this.turn=0;//负责转向
    this.vr=0;//角速度？
    this.vx=0;//x轴速度
    this.vy=0;//y轴速度
    this.thrust=0;//加速度
    this.ax=0;
    this.ay=0;
    this.x=canvas.width/2;
    this.y=canvas.height/2;
    this.flag_1=0;//速度是小时自动降为0的程度
    this.flag_2=0;//
    this.limit=6;
    this.offset_x=-10;
    this.offset_y=8;
}
Ship.prototype.KeySet=function(up,down,left,right,fire){
    for (a in arguments)
		if(a===undefined) console(a.name+"unknow");
    this.up=up;
    this.down=down;
    this.left=left;
    this.right=right;
    this.fire=fire;
};
Ship.prototype.draw=function(context){
    //console.log(this.name+'->'+this.color);
    if(this.limit<6)this.limit+=0.02;
    QQ=-20;
    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotation);
    context.lineWidth=1;
    context.strokeStyle='black';
    context.fillStyle=this.color;
    context.beginPath();
    //context.moveTo(1,0);
    //context.lineTo(-1,0);
    context.moveTo(QQ+40,0);
    context.lineTo(QQ+31,6);
    context.lineTo(QQ+20,6);
    context.lineTo(QQ+10,16);
    context.lineTo(QQ+0,16);
    context.lineTo(QQ+4,4);
    context.lineTo(QQ+4,-4);
    context.lineTo(QQ+0,-16);
    context.lineTo(QQ+10,-16);
    context.lineTo(QQ+20,-6);
    context.lineTo(QQ+31,-6);
    context.lineTo(QQ+40,0);
    context.moveTo(QQ+35,0);
    context.lineTo(QQ+30,2);
    context.lineTo(QQ+26,2);
    context.lineTo(QQ+26,-2);
    context.lineTo(QQ+30,-2);
    context.lineTo(QQ+35,0);
    context.moveTo(QQ+31,6);
    context.lineTo(QQ+29,10);
    context.lineTo(QQ+23,10);
    context.lineTo(QQ+27,6);
    context.moveTo(QQ+31,-6);
    context.lineTo(QQ+29,-10);
    context.lineTo(QQ+23,-10);
    context.lineTo(QQ+27,-6);
    context.moveTo(QQ+4,2);//垂直翼
    context.lineTo(QQ+17,2);
    context.lineTo(QQ+17,-2);
    context.lineTo(QQ+4,-2);
    //context.closePath();
    context.fill();
    context.stroke();
    context.fillStyle='red';
    if(this.showFlame==1){
        context.beginPath();
        context.moveTo(QQ+4,4);
        context.lineTo(QQ+-4,2);
        context.lineTo(QQ+4,0);
        context.lineTo(QQ+-4,-2);
        context.lineTo(QQ+4,-4);
        context.fill();
        context.stroke();
    }
    if(this.showFlame==-1){
        /*context.beginPath();
        context.moveTo(QQ+18,-8);
        context.lineTo(QQ+10,0);
        context.lineTo(QQ+18,8);
        context.fill();
        context.stroke();*/
    }
    else if(this.turn==1){
        context.beginPath();
        context.moveTo(QQ+28,6);
        context.lineTo(QQ+30,10);
        context.lineTo(QQ+26,20);
        context.lineTo(QQ+22,10);
        context.lineTo(QQ+24,6);
        context.fill();
        context.stroke();
    }
    else if(this.turn==-1){
        context.beginPath();
        context.moveTo(QQ+28,-6);
        context.lineTo(QQ+30,-10);
        context.lineTo(QQ+26,-20);
        context.lineTo(QQ+22,-10);
        context.lineTo(QQ+24,-6);
        context.fill();
        context.stroke();
    }

    context.restore();
};
//Ship.prototype.fcalculate=function()
Ship.prototype.fcalculate=function(vx,vy)
{
    if(this.showFlame==0&&Math.sqrt(vx*vx+vy*vy)<1)
    {
        //console.log('conversion 1');
        return 0;
    }else if(Math.sqrt(vx*vx+vy*vy)<8)
    {
        //console.log('conversion 2');
        return 1-(Math.sqrt(vx*vx+vy*vy)/160);
    }else{
        //console.log('conversion 3');
        return 0.95;}
};
Ship.prototype.KeydownJudge=function(code,booms){
    var a=this.left,
        b=this.right,
        c=this.up,
        d=this.down,
        e=this.fire;
    //console.log(this.fire);
    //switch(code)
    //		{
    //			case a:
    if(code==a){
        this.vr=-3;
        this.turn=1;
    }				//break;//<--
    //case b:
    if(code==b){
        this.vr=3;
        this.turn=-1;
    }			//	break;//-->
    //case c:
    if(code==c){
        this.thrust=0.50;
        this.showFlame=1;//向前
    }			//	break;
    //case d:
    if(code==d){
        this.thrust=-0.10;
        this.showFlame=-1;//向后
    }			//	break;
    //case e:
    if(code==e&&this.limit>=1){
        //console.log('扔了一颗炸弹');
        var temp=Math.sqrt(this.offset_x*this.offset_x+this.offset_y*this.offset_y);
        this.offset_y=-this.offset_y;
        boom=new Boom('number');//+NumberOfBooms);
        boom.color=this.color;
        boom.x=this.x+temp*Math.sin(-this.rotation-90+Math.atan(this.offset_y/this.offset_x));
        boom.y=this.y+temp*Math.cos(-this.rotation-90+Math.atan(this.offset_y/this.offset_x));
        boom.thrust=0.05+this.thrust;
        boom.rotation=this.rotation;
        boom.aurther=this.name;
        //NumberOfBooms++;
        booms.push(boom);
        this.limit--;
    }
    //break;
    //}
}
Ship.prototype.KeyupJudge=function(code){
    var a=this.left,
        b=this.right,
        c=this.up,
        d=this.down;
    e=this.fire;
    if(code==a||code==b)
    {
        this.turn=0;
        this.vr=0;
    }
    if(code==c||code==d)
    {
        this.thrust=0;
        this.showFlame=0;
        this.ay=0;
        this.ax=0;
    }
}
Ship.prototype.MoveAndJudge=function(context){
    if(this.health==0){
        this.vr=0;
    }
    Ff=this.fcalculate(this.vx,this.vy);
    this.rotation+=this.vr*Math.PI/180;
    this.ax=Math.cos(this.rotation)*this.thrust;
    this.ay=Math.sin(this.rotation)*this.thrust;
    this.vx += this.ax;
    this.vy += this.ay;
    this.vx*=Ff;
    this.vy*=Ff;
    if(this.health==0){
        this.vx=0;
        this.vy=0;
        this.showFlame=0;
        this.turn=0;
        console.log(this.name+'die!');
    }
    this.x+=this.vx;
    this.y+=this.vy;
    this.draw(context);
    if(this.x-this.width/2>canvas.width){this.x=0-this.width/2;}
    else if(this.x+this.width/2<0){this.x=canvas.width+this.width/2;}
    if(this.y-this.height/2>canvas.height){this.y=0-this.height/2;}
    else if(this.y+this.height/2<0){this.y=canvas.height+this.height/2;}
}
Ship.prototype.HealthPrint=function(context){


    context.beginPath();
    context.fillStyle="red";
    context.strokeStyle="white";
    //console.log(this.name+'->'+this.x+','+this.y);
    context.moveTo(this.x-20+this.health*40/50,this.y-50);
    context.lineTo(this.x-20+this.health*40/50,this.y-55);//一旦绘画生效就会
    context.lineTo(this.x-20,this.y-55);
    context.lineTo(this.x-20,this.y-50);
    context.lineTo(this.x-20+this.health*40/50,this.y-50);
    context.closePath();
    context.fill();
    context.moveTo(this.x-20+this.health*40/50,this.y-50);
    context.lineTo(this.x-20+this.health*40/50,this.y-55);//一旦绘画生效就会
    context.lineTo(this.x+60,this.y-55);
    context.lineTo(this.x+60,this.y-50);
    context.lineTo(this.x-20+this.health*40/50,this.y-50);
    context.stroke();
    context.restore();
    context.beginPath();
    for(var i=0;i<6;i++){
        context.fillStyle=this.color;
        context.moveTo(this.x-20+i*15,this.y-30);
        context.lineTo(this.x-20+i*15,this.y-38);
        context.lineTo(this.x-12+i*15,this.y-38);
        context.lineTo(this.x-12+i*15,this.y-30);
        context.lineTo(this.x-20+i*15,this.y-30);
        context.closePath();
        if(this.limit>=i+1)context.fill();
    }//context.strokeStyle="white";
    context.font="20px Arial";
    //context.center='center';
    //Place each word at y=100 with different textBaseline values
    //context.textBaseline="top";
    context.fillStyle="black";
    context.fillText(this.name+':'+this.health+'/100',this.x-20,this.y-65);
    context.stroke();
    context.restore();


}