/*
* @Author: caikangkang
* @Date:   2016-08-18 10:21:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-22 22:01:53
*/

'use strict';
angular.module('myApp', [])
.factory("service",function(){
    var service = {};
    var _initData = 'initDataByFactory';
    service.getData = function(arg){
        return _initData + (arg?arg:"");      
    }
    return service;
})
.run(function($rootScope){
	$rootScope.name="my angular xxx";
})
.directive('myDirective', function() {
    var option={
    	restrict: "AECM",
    	template: '<span>Name: {{customer.name}} Age:{{customer.age}} Address: {{customer.address}}</span>',
      	replace:true
    };
    return option;
})
.directive('linkDirective', function() {
    var option={
    	restrict: "AEC",
    	templateUrl: 'link.html',
      	replace:true
    };
    return option;
})
.controller('myCtrl01',['$scope','service',function($scope,service){
	$scope.person={
		name:"xiaocai"
	}
	$scope.name="jiuna";
    $scope.initData = service.getData('myCtrl01');
}])
.controller('myCtrl02',['$scope',function($scope){
	$scope.customer={
		name:"wangsan",
		age:"18",
		address:"shanghai"
	}
}])
.controller('myCtrl03',['$scope',function($scope){
    function nowTime(){
        return new Date().toLocaleString() ;
    }
    $scope.getTime=function(){
        setInterval(function(){
            $scope.$apply(function(){
                $scope.time = nowTime();
            })
        }, 50)   
    };
    $scope.getTime();
}])
.controller('myCtrl04',['$scope',function($scope){
    $scope.playing = false; //是否播放
    $scope.speed=false;    //播放速度
    $scope.oriSpeed=1;    //前一次播放速度
    $scope.audio = document.querySelector('#audio'); 
    $scope.play = function() { 
        if(!$scope.speed) $scope.speed=1;
        if($scope.speed) $scope.speed=$scope.oriSpeed;
        $scope.audio.play(); 
        $scope.playing = true; 
    }; 
    $scope.stop = function() { 
        $scope.speed=0;
        $scope.audio.pause(); 
        $scope.playing = false; 
    }; 
    $scope.end = function(){
        $scope.speed=0;
        $scope.oriSpeed=1;
        $scope.audio.currentTime=0;
        $scope.audio.pause();
        $scope.playing = false;
    }
    $scope.audio.addEventListener('ended', function() { 
      $scope.$apply(function() { 
        $scope.end(); 
      }); 
    }); 
    $scope.setSpeed = function(speed){
        if(!$scope.playing) return;
        $scope.speed=speed;
        $scope.oriSpeed=speed;
        $scope.audio.playbackRate=speed;
    } 
}])
.controller('myCtrl05',['$scope',function($scope){
    $scope.result=0;
    $scope.add = function(n){
        $scope.result+=n;
    };
    $scope.sub = function(n){
        $scope.result-=n;
    };
}])
.controller('myCtrl06',['$scope',function($scope){
    $scope.n=0;
    $scope.lists=[{
        name:"Tab01",
        ID:"id01"   
    },{
        name:"Tab02",
        ID:"id02"    
    },{
        name:"Tab03",
        ID:"id03"    
    }];
    $scope.ID=$scope.lists[$scope.n].ID;
    $scope.changeTab = function(n,list){
        $scope.n=n;
        $scope.ID=list.ID;
    }
}])
.controller('myCtrl07',['$scope',function($scope){
    $scope.selectAll=false;
    $scope.n=[false,false,false,false,false];


    $scope.isFalse=function(v){
        return v==false;
    };
    $scope.isTrue=function(v){
        return v==true;
    }

    $scope.all=function(m){
        console.log(m);
        for(var i=0;i<$scope.n.length;i++){  
          if(m===true){  
              $scope.n[i]=false;  
          }else {  
              $scope.n[i]=true;  
          }  
        }
        $scope.selectAll=!$scope.selectAll; 
    };

    $scope.check=function(){
        if($scope.n.every($scope.isFalse)&&$scope.selectAll){
            $scope.selectAll=false;
        }
        if($scope.n.every($scope.isTrue)&&!$scope.selectAll){
            $scope.selectAll=true;
        }
    }
}])