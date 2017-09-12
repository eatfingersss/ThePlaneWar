function Boom(name,color){
	this.name=name;
	this.color=color;
	this.x=0;
	this.y=0;
	this.width=20;
	this.height=4;
	this.rotation=0;
	this.vx=0;
	this.vy=0;
	this.safe=0;
	this.thrust=0.08;
	this.aurther='';
	//this.showFlame=0;
}
Boom.prototype.draw=function(context){
	context.save();
	context.translate(this.x,this.y);
	context.rotate(this.rotation);
	context.lineWidth=1;
	//context.fillStyle=this.color;
	context.strokeStyle=this.color;
	var QQ=-10;
	if(this.safe==0)
	{
		context.beginPath();
		context.strokeStyle="black";
		context.fillStyle=this.color;
		context.moveTo(QQ+20,0);
		context.lineTo(QQ+16,2);
		context.lineTo(QQ+12,2);
		context.lineTo(QQ+10,4);
		context.lineTo(QQ+6,4);
		context.lineTo(QQ+6,2);
		context.lineTo(QQ+12,2);
		context.lineTo(QQ+6,2);
		context.lineTo(QQ+0,0);
		context.lineTo(QQ+6,-2);
		context.lineTo(QQ+6,2);
		context.lineTo(QQ+6,-2);
		context.lineTo(QQ+12,-2);
		context.lineTo(QQ+6,-2);
		context.lineTo(QQ+6,-4);
		context.lineTo(QQ+10,-4);
		context.lineTo(QQ+12,-2);
		context.lineTo(QQ+16,-2);
		context.lineTo(QQ+20,0);
		context.fill();
		context.stroke();
		context.restore();
	}
	else(this.safe>0)
		context.beginPath();
		var temp=this.safe;
		for(;this.safe>0;this.safe-=1)
		{context.moveTo(this.safe*(QQ+20),this.safe*(0));
		context.lineTo(this.safe*(QQ+22),this.safe*(2));
		context.lineTo(this.safe*(QQ+18),this.safe*(1.8));
		context.lineTo(this.safe*(QQ+19),this.safe*(7));
		context.lineTo(this.safe*(QQ+15),this.safe*(4.5));
		context.lineTo(this.safe*(QQ+16),this.safe*(10));
		context.lineTo(this.safe*(QQ+16.5),this.safe*(6.5));
		context.lineTo(this.safe*(QQ+14.5),this.safe*(10));
		context.lineTo(this.safe*(QQ+6.5),this.safe*(6));
		context.lineTo(this.safe*(QQ+4.5),this.safe*(8.2));
		context.lineTo(this.safe*(QQ+3.5),this.safe*(3.5));
		context.lineTo(this.safe*(QQ+1.5),this.safe*(5));
		context.lineTo(this.safe*(QQ+-1),this.safe*(1.8));
		context.lineTo(this.safe*(QQ+0),this.safe*(0));
		context.lineTo(this.safe*(QQ+-1),this.safe*(-1.8));
		context.lineTo(this.safe*(QQ+1.5),this.safe*(-5));
		context.lineTo(this.safe*(QQ+3.5),this.safe*(-3.5));
		context.lineTo(this.safe*(QQ+4.5),this.safe*(-8.2));
		context.lineTo(this.safe*(QQ+6.5),this.safe*(-6));
		context.lineTo(this.safe*(QQ+14.5),this.safe*(-10));
		context.lineTo(this.safe*(QQ+16.5),this.safe*(-6.5));
		context.lineTo(this.safe*(QQ+16),this.safe*(-10));
		context.lineTo(this.safe*(QQ+15),this.safe*(-4.5));
		context.lineTo(this.safe*(QQ+19),this.safe*(-7));
		context.lineTo(this.safe*(QQ+18),this.safe*(-1.8));
		context.lineTo(this.safe*(QQ+22),this.safe*(-2));
		context.lineTo(this.safe*(QQ+20),this.safe*(0));
	}

		context.stroke();
		context.restore();
		this.safe=temp;
		
	
};
Boom.prototype.MoveAndJudge=function(context,ship){
	
	if(this.safe==0)
	{
		//console.log('飞弹在移动..')
		this.vx += Math.cos(this.rotation)*this.thrust;
		this.vy += Math.sin(this.rotation)*this.thrust;
		this.x+=this.vx;
		this.y+=this.vy;
	} 
	for (var i = 0; i <ship.length; i++) 
	{
		var QQ=0;
		if(ship[i].name==this.aurther) continue;
		if(this.x-this.width/2>canvas.width||
			this.x+this.width/2<0||
			this.y-this.height/2>canvas.height||
			this.y+this.height/2<0
			/*this.x<this.x+this.width/2&&
			this.x>this.x-this.width/2&&
			this.y<this.y+this.height/2&&
			this.y>this.y-this.height/2*/)
		{this.safe+=0.3;console.log(canvas.width+'欧拉欧拉');}
	if(Math.sqrt((this.x+QQ-ship[i].x)*(this.x+QQ-ship[i].x)+(this.y-ship[i].y)*(this.y-ship[i].y))<20	)
		{this.safe+=0.3;if(ship[i].health>0) ship[i].health-=2;console.log(ship[i].name+':'+ship[i].health)}	
		

	};
	if(this.safe>0)this.safe+=0.3;
	this.draw(context);		
	if(this.safe>9) return true;
		else return false;
};