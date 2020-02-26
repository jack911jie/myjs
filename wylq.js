var name_Arr = ["立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
"立夏", "小满", "芒种", "夏至", "小暑", "大暑",
"立秋", "处暑", "白露", "秋分", "寒露", "霜降",
"立冬", "小雪", "大雪", "冬至", "小寒", "大寒"]

var tg={0:'甲',1:'乙',2:'丙',3:'丁',4:'戊',5:'己',6:'庚',7:'辛',8:'壬',9:'癸'}
var dz={0:'子',1:'丑',2:'寅',3:'卯',4:'辰',5:'巳',6:'午',7:'未',8:'申',9:'酉',10:'戌',11:'亥'}

function showgz(y,m,d,h=-1){    
    var  year=$('#y').val();
    var month=$('#m').val();
    var day=$('#d').val();
    var hour=$('#h').val();
    if(hour==""){
        hour=-1
    }
    var res=cal_gz(year,month,day,hour)

    $('#show').text(res)
    
}


function  cal_gz(y,m,d,h=-1,zishi=0){
     console.log('begin test');
   

    //子时的处理：
    //0：23-0点也属于后一天（默认）
    //1:   23-0点属于当天
    if(zishi==0){
        if(h==23){
            console.log('该时辰算入下一天的子时')
            var tmp_d=new Date(y,m,d)
            tmp_d.setDate(tmp_d.getDate()+1)
            var year=tmp_d.getFullYear()
            var month=tmp_d.getMonth()
            var day=tmp_d.getDate()
            var hour=h
        }else{            
            var year=y
            var month=m
            var day=d
            var hour=h
        }
    }else if(zishi==1){
        if(h==23){
            console.log('该时辰算当天的子时')
        }
            var year=y
            var month=m
            var day=d
            var hour=h
    }
    var result_cal= togz(year,month,day,hour)
    var htmltxt=[y,m,d,h==-1?"":h,result_cal]
    console.log(htmltxt)
    return htmltxt
}

function togz(y,m,d,h){
    if(y%10>3){
        var N=y%10-3;
    }else{
        var N=y%10-3+10;
    }

    if(y%12>3){
        var M=y%12-3;
    }else{
        var M=y%12-3+12;
    }

    N=N-1;  //索引从0开始
    M=M-1;

    jq_In=jq2(y,m,d)

    //按节气来计算月份：    
    for(i=0;i<name_Arr.length;i++){
        if(jq_In[0][0]==name_Arr[i]){
            if(i%2==0){
                var month=i+1  
            }else{
                var month=i
            }
            break
        }        
    }

    month=(month+1)/2

    M_g=month-1     //列表索引从0开始
    M_z=month-1+2  //地支从寅开始，初始列表从子开始，所以+2。

    //年的干支序数
    Y_g=N
    Y_z=M

//月的干支序数
//    月份:
// 甲己之年丙作首  2
// 乙庚之年戊为头  4
// 丙辛之岁寻庚上  6
// 丁壬——壬 8
// 戊癸——甲 0

//根据以上口诀调整月干排序的参数：
    if(N==0||N==5){
        var re_m=2
    }else if(N==1||N==6){
        var re_m=4
    }else if(N==2||N==7){
        var re_m=6
    }else if(N==3||N==8){
        var re_m=8
    }else if(N==4||N==9){
        var re_m=0
    }

    //日的干支序数
    var yd_this=y.toString()+'-1-1'
    var today=y.toString()+'-'+m.toString()+'-'+d.toString()
    var res=parseInt(comparedate(today,yd_this)/1000/86400)
    var yd_this_gz=yd(y)
    var D_g=res%10+yd_this_gz[0]>9?res%10+yd_this_gz[0]-10:res%10+yd_this_gz[0] //根据当年的元旦干支计算，以当年元旦干支的序号重新定位。
    var D_z=res%12+yd_this_gz[1]>11?res%12+yd_this_gz[1]-12:res%12+yd_this_gz[1]


    //时的干支序数：
    //  时干（看日干而定）：
    // 甲己——甲  0
    // 乙庚——丙 2
    // 丙辛——戊 4
    // 丁壬——庚 6
    // 戊癸——壬 8
   
    if(D_g==0||D_g==5){
        var re_h=0
    }else if(D_g==1||D_g==6){
        var re_h=2
    }else if(D_g==2||D_g==7){
        var re_h=4
    }else if(D_g==3||D_g==8){
        var re_h=6
    }else if(D_g==4||D_g==9){
        var re_h=8
    }

    h=parseInt(h)
    if(h%2!=0){
        H_g=(h+1)/2
        H_z=(h+1)/2
    }else{
        H_g=h/2
        H_z=h/2
    }
   


    if(h==-1 || h==" "){  //无“时”的输入
        console.log('无时辰的输入')
        H_g=''
        re_h=''
        H_z=''
    }else{
        console.log('有时辰的输入')
        // H_g=h_0
        // H_z=h_0       
    }

    console.log(h,h/2,(h+1)/2,H_z)

    var dis_Y_g,dis_Y_z,dis_M_g,dis_M_z,dis_D_g,dis_D_z


  if(jq_In[0][0]=='冬至'||jq_In[0][0]=='小寒'||jq_In[0][0]=='大寒'){  //处理当年1月份、2月份立春前的日期
    Y_g=Y_g-1
    Y_z=Y_z-1    
    M_g=M_g
    }

    try{
        dis_Y_g=tg[deal_odr(Y_g,'g')]
        dis_Y_z=dz[deal_odr(Y_z,'z')]
        dis_M_g=tg[deal_odr(M_g+re_m,'g')]
        dis_M_z=dz[deal_odr(M_z,'z')]
        dis_D_g=tg[deal_odr(D_g,'g')]
        dis_D_z=dz[deal_odr(D_z,'z')]
        dis_H_g=tg[deal_odr(H_g+re_h,'g')]
        dis_H_z=dz[deal_odr(H_z,'z')]
    }catch{
        ;
    }


   
    var gz=[dis_Y_g,dis_Y_z,dis_M_g,dis_M_z,dis_D_g,dis_D_z,dis_H_g,dis_H_z]

    console.log(gz)

    for(i=0;i<gz.length;i++){
        if(typeof(gz[i])=='undefined'||gz[i]==-1){  //时间未输入，赋值为空
            gz[i]=' '
        }
    }

 
    console.log(gz)
    return gz

}

function deal_odr(n,j){
    if(j=='z'){
        if(n<0){
            n=n+12
        }else if(n>11){
            n=n-12
        }
    }else if(j=='g'){
        if(n<0){
            n=n+10
        }else if(n>9){
            n=n-10
        }
    }
    return n
}

function jq2(y,m,d){
    var ymd=y+"-"+m+"-"+d
    var jieqiData=JSON.parse(data)
    var jqdata=jieqiData[y]

    var info=new Array()
    for(i=0;i<name_Arr.length;i++){
                var inf=getoutjq(jqdata,name_Arr[i])
                info.push([name_Arr[i],inf[0]])
    }
    
    var jqinfo=[]
    jqinfo[0]=info[22]
    jqinfo[1]=info[23]
    for(i=0;i<22;i++){
        jqinfo.push(info[i])
    }
    var t =new Array()
    for(i=0;i<jqinfo.length;i++){
        // console.log(jqinfo[i],ymd)
        var result=comparedate(jqinfo[i][1],ymd)

        if(result>0){ 
            try{
                t.push(jqinfo[i-1][0])
                t.push(jqinfo[i][0])            
                break     
            }
            catch(err){    //处理1月份小寒以前的日期
                // console.log("res:",result,err.message)
                t.push('冬至')
                t.push('小寒')            
                break     
            }                            
        }
    }
    if(result<0){
        t.push('冬至')
        t.push('小寒')        
    }

// console.log(ymd+"："+t,res)
    var out=[t,jqinfo]
    return out

}

function yd(b){
    var a=1899 //从1900年的元旦推算到今年元旦,1900年为：己亥年 丙子月 甲戌日
    b=b-1
    var A_run=parseInt(a/4)-parseInt(a/100)+parseInt(a/400)
    var A_ping=a-A_run
    var B_run=parseInt(b/4)-parseInt(b/100)+parseInt(b/400)
    var B_ping=b-B_run
    var x=B_ping-A_ping
    var y=B_run-A_run
    var t=x*365+y*366


    var di=tg[t%10]+dz[t%12+10>11?t%12+10-12:t%12]  //从1900元旦为甲戌，戌为第10位
    var di_out=[t%10,t%12+10>11?t%12+10-12:t%12]
    // console.log(di,di_out)
    return di_out

}

function getoutjq(a,b){
    var jq= new Array()
    var re=/\d.+日/  //日
    var s=re.exec(a[b])[0]
    var day=s.split(/年|月|日/,3)  //将日期用'-'来连接
    day=day.join("-")
    jq.push(day)

    // var re=/农历.+/      //农历
    // var s=re.exec(a[b])[0]
    // jq.push(s)
    return jq
}

function comparedate(o,n){
    var olddate=new Date(o)
    var newdate=new Date(n)
    var res=olddate-newdate
    return res
}


// cal_gz(2020,3,2,2,zishi=0)
// cal_gz(2020,3,2,2,zishi=1)
// cal_gz(2020,3,2,23,zishi=0)
// cal_gz(2020,3,2,23,zishi=1)
// cal_gz(2020,3,2)
