function  cal(){
    console.log('begin test');
    year=$('#y').val();
    month=$('#m').val();
    day=$('#d').val();
    // alert(year+month+day);
    
    var _y=year.split('');
    var y_4=_y[_y.length-1];
    console.log(year+'年是：'+togz(year))
    togz()
}

function togz(n){
    console.log(n)
    var tg={0:'甲',1:'乙',2:'丙',3:'丁',4:'戊',5:'己',6:'庚',7:'辛',8:'壬',9:'癸'}
    var dz={0:'子',1:'丑',2:'寅',3:'卯',4:'辰',5:'巳',6:'午',7:'未',8:'申',9:'酉',10:'戌',11:'亥'}
    if(n%10>3){
        var N=n%10-3;
    }else{
        var N=n%10-3+10;
    }

    if(n%12>3){
        var M=n%12-3;
    }else{
        var M=n%12-3+12;
    }

    N=N-1;
    M=M-1;
    console.log(N,M);
    g=tg[N];
    z=dz[M];
    var gz=[g,z];
    // 公元后的算法：
    // 年干=N-3(N>3)或N-3+10(N≤3)，N=年号除以10的余数=年号个位数。
    // 年支=N-3(N>3)或N-3+12(N≤3)，N=年号除以12的余数。

    // 公元前的算法：
    // 年干=8-N(N﹤8)或8-N+10(N≧8)，N=年号除以10的余数=年号个位数。
    // 年支=10-N(N<10)或10-N+12(N≧10)，N=年号除以12的余数。

    // C取决于节气和年份。

    // 日期计算：

    // 通式寿星公式——[Y×D+C]-L

    // Y=年代数的后2位、D=0.2422、L=闰年数、C取决于节气和年份。

    // 21世纪立春的C值=3.87
    // 例如：2017年的立春日期

    // [17×0.2422+3.87]-[（17-1）/4]=7.9874-4=3

    // 所以2017年的立春日期是2月3日。（注：计算结果只保留整数）
    return gz

}

function jieqi(y,m,d){
    var C_Arr_21= [3.87, 18.73, 5.63, 20.646, 4.81, 20.1,
        5.52, 21.04, 5.678, 21.37, 7.108, 22.83,
        7.5, 23.13, 7.646, 23.042, 8.318, 23.438,
        7.438, 22.36, 7.18, 21.94, 5.4055, 20.12]

    var  C_Arr_20 = [4.6295,19.4599,6.3826,21.4155,5.59,20.888,
            6.318,21.86,6.5,22.2,7.928,23.65,
            28.35,23.95,8.44,23.822,9.098,24.218,
            8.218,23.08,7.9,22.6,6.11,20.84]

    

    var name_Arr = ["立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
            "立夏", "小满", "芒种", "夏至", "小暑", "大暑",
            "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
            "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"]


            if(y<2000){
                var C_Arr=C_Arr_20
            }else if(y>2000){
                var C_Arr=C_Arr_21
            }else{   //2000的大小寒用1999年的数据，1999年属于20世纪
                var C_Arr=C_Arr_21
                C_Arr[22]=C_Arr_20[22]
                C_Arr[23]=C_Arr_20[23]    
            }

            // console.log(C_Arr)
            var L=parseInt(y/4)-parseInt(y/100)+parseInt(y/400)
            console.log(y+'年，'+(parseInt(y/100)+1)+'世纪')

            var jieqi_date_list=new Array()
            for(i=0;i<24;i++){
                var jieqi_m=parseInt(i/2)+2
                

                if(i<22){
                    var jieqi_d=parseInt(y*0.2422+C_Arr[i])-L
                    var jieqi_ymd=y+'-'+jieqi_m+'-'+jieqi_d
                    console.log(jieqi_ymd+'：'+name_Arr[i])
                    jieqi_date_list.push(jieqi_ymd)
                }else{
                    var jieqi_d=parseInt((y-1)*0.2422+C_Arr[i])-L  //实际上是去年小寒大寒，所以如果要计算的是2000年的小寒大寒，应该用20世纪的C来计算
                    var jieqi_ymd=y+'-'+(jieqi_m-12)+'-'+jieqi_d
                    console.log(jieqi_ymd+'：'+name_Arr[i])
                    jieqi_date_list.push(jieqi_ymd)
                }
            }

            var j=new Array()
            j.push(jieqi_date_list[22])
            j.push(jieqi_date_list[23])
            for(i=0;i<22;i++){
                j.push(jieqi_date_list[i])
            }

            // console.log(j)

            var j_name= new Array()
            j_name.push(name_Arr[22])
            j_name.push(name_Arr[23])
            for(i=0;i<24;i++){
                j_name.push(name_Arr[i])
            }

            var inputdate=y+'-'+m+'-'+d
            for(i=0;i<24;i++){
                    var res=comparedate(j[i],inputdate)
                    // console.log(res)
                    if(res>=0){
                        var loc=i-1
                        break
                    }
            }

            
            console.log(j[loc]+'：'+j_name[loc]+' 和 '+j[loc+1]+'：'+j_name[loc+1])


            // for(i=0;i<)
            // (1)通式公计算式——[Y×D+C]-L

            // Y=年代数、D=0.2422、L=闰年数、C取决于节气和年份。
            
            // (2)设要计算的年为A,则到A年为止（含A年）的闰年数为：
            //             闰年的定义：

            // 能被4整除的非世纪年(1900年虽能被4整除但因为是世纪年 故不是闰年)

            // 能被400整除的世纪年(2000年可以被400整除 故是闰年)
                        
            // 闰年数=INT(A/4)-INT(A/100)+INT(A/400),INT为取整数函数
            
            // 本世纪立春的C值=4.475，求2017年的立春日期如下：
            
            // [2017×0.2422+4.475]-[2017/4-2107/100+2017/400]=492-489=3
            
            // 所以2017年的立春日期是2月3日.
            

}

function jq2(y,m,d){
    var ymd=y+"-"+m+"-"+d
    var name_Arr = ["立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
    "立夏", "小满", "芒种", "夏至", "小暑", "大暑",
    "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
    "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"]
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

    for(i=0;i<jqinfo.length;i++){
        res=comparedate(jqinfo[i][1],ymd)
        if(res>=0){
            t=jqinfo[i-1][0]+"--"+jqinfo[i][0]
            console.log(ymd+"："+t)
            break
        }
    }
    

}

// var result
// $.ajax({
//     url: "src/1800-2100jieqi.json",//json文件位置
//     type: "GET",//请求方式为get
//     dataType: "json", //返回数据格式为json
//     success: function(data) {//请求成功完成后要执行的方法 
//         console.log('success')
//         result=data
//     }
//  })

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

jq2(2017,04,25)
