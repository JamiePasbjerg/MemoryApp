// JavaScript Document
document.addEventListener('DOMContentLoaded',function() {
	'use strict';
	var tileImages=['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
	var board=document.getElementById('board');
	var tilesFlipped=[];
	var tilesMatch=[];
	var i;
	
	function drawBoard(event) {
		event.preventDefault();
		document.getElementById('welcome').style.display='none';
		board.style.display='flex';
		
		var gameTiles=document.getElementById('playGame').level.value;
		console.log(gameTiles);
		var gameTileImages=tileImages.slice(0,gameTiles/2);
		gameTileImages=gameTileImages.doubleShuffle();
		
		for(i=0;i<gameTileImages.length;i+=1) {
			var content='';
			content+='<section>';
			content+='<div class="front"></div>';
			content+='<div class="back">'+gameTileImages[i]+'</div>';
			content+='</section>';
			
			board.insertAdjacentHTML('beforeend',content);
		}
	}
	
	Array.prototype.doubleShuffle=function() {
		var d;
		for(d=0;d<this.length;d=d+2) {
			this.splice(d+1,0,this[d]);
		}
		console.log(this);
		var i=this.length;
		var j;
		var temp;
		while (--i>0) {
			j=Math.floor(Math.random()*(i+1));
			console.log(j);
			temp=this[j];
			this[j]=this[i];
			this[i]=temp;
		}
		console.log(this);
		return this;
	}
	
	function newGame() {
		board.innerHTML='';
		board.style.display='none';
		document.getElementById('welcome').style.display='flex';
		document.getElementById('message').classList.remove('show');
	}
	
	function endOfGame() {
		if(board.getElementsByTagName('section').length === board.getElementsByClassName('reward').length) {
			document.getElementById('message').classList.add('show');
		}
	}
	
	function flipBack() {
		var tiles=board.querySelectorAll('section');
		tiles[tilesFlipped[0]].classList.remove('flipped');
		tiles[tilesFlipped[1]].classList.remove('flipped');
		tilesFlipped=[];
		tilesMatch=[];
		board.style.pointerEvents='auto';
	}
	
	function twoTiles(tiles) {
		if(tilesFlipped.length>=2) {
			board.style.pointerEvents='none';
			if(tilesMatch[0]===tilesMatch[1]) {
				console.log(tiles[tilesFlipped[0]]);
				tiles[tilesFlipped[0]].classList.add('reward');
				tiles[tilesFlipped[1]].classList.add('reward');
				tilesFlipped=[];
				tilesMatch=[];
				setTimeout(endOfGame,500);
				board.style.pointerEvents='auto';
			} else {
				setTimeout(flipBack,1500);
			}
		}
	}
	
	function flipTile(event) {
		var tiles=Array.from(board.querySelectorAll('section'));
		if(event.target !==event.currentTarget) {
			if(!event.target.parentNode.classList.contains('flipped')) {
				event.target.parentNode.classList.add('flipped');
				tilesFlipped.push(tiles.indexOf(event.target.parentNode));
				console.log(tilesFlipped);
				console.log(event.target);
				tilesMatch.push(event.target.nextElementSibling.innerHTML);
				console.log(tilesMatch);
				twoTiles(tiles);
			}
		}
	}
	
	document.getElementById('playGame').addEventListener('submit',drawBoard);
	board.addEventListener('touchend',flipTile);
	document.getElementById('message').querySelector('button').addEventListener('click',newGame);
});
