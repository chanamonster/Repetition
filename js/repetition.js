console.log("moo jefffdfdfdfdffefefe");
factor = 9;

$(function () { 
    drawSongs();

    var holder;

	$('#songs').on('mouseenter', 'img', function(){
		var info = $(this).attr('id');
		holder = $(this).css('opacity');
		$(this).css('opacity', '1.0');
		showLyrics(info);
		drawSongGraph(info);
	})

	$('#songs').on('mouseout', 'img', function(){
		$(this).css('opacity', holder);
		$('#data').html('');
		$('#lyrics').html('');
		$('#graph').html('');
	})

	$('#songs').on('click', 'img', function(){
		var info = $(this).attr('id');
		drawSongGraph(info);
		keepLyrics(info);
	})
});

function drawSongs(){
	$.getJSON("lyricsMap.json", function(data) {
		//111 items
		var color;
		for (var i = 0; i < data.length; i++){
			if (data[i].genre == "pop"){ color = "salmon"; }
			if (data[i].genre == "hiphop"){ color = "green"; }
			if (data[i].genre == "country"){ color = "yellow"; }
			if (data[i].genre == "rnb"){ color = "purple"; }
			if (data[i].genre == "hip house"){ color = "evergreen"; }
			if (data[i].genre == "alternative rock"){ color = "navy"; }
			if (data[i].genre == "edm"){ color = "pink"; }
			if (data[i].genre == "indie pop"){ color = "blue"; }
			if (data[i].genre == "soul"){ color = "evergreen"; }
			if (data[i].genre == "indie folk"){ color = "trueblue"; }
			if (data[i].genre == "funk"){ color = "navy"; }
			if (data[i].genre == "folk"){ color = "trueblue"; }
			if (data[i].genre == "club"){ color = "pink"; }
			if (data[i].genre == "rock and roll"){ color = "kellygreen"; }
			if (data[i].genre == "soft rock"){ color = "kellygreen"; }
			if (data[i].genre == "indie rock"){ color = "kellygreen"; }
			if (data[i].genre == "quiet storm"){ color = "lavender"; }
			if (data[i].genre == "kpop"){ color = "lavender"; }
			str = "<img id='"+data[i].rank+"' src='"+color+".png' width='4px' height='"+((data[i].percent*100)+20)+"px' style='opacity:0.8'>"
			// console.log(data[i].song+" - "+data[i].percent);

			$('#songs').append(str);
		}

		// for (var i=0; i < 111; i++){
		// 	var str = "";
		// 	str += '<img id="'+data[i].song+' by '+data[i].artist+'"src="salmon.png" width="10px" height="'+data[i].percent*100+'px">'
		// 	$('#pop').append(str);
		// 	// $('#yr2011').append(percents12[i+1]+" -- "+data.results.collection1[i].SongTitle+"<br>");
		// }
	});
}

function showLyrics(num){
	$.getJSON("lyricsMap.json", function(data) {
		var str = "<b>"+data[num].song+"<br>"+data[num].artist+"</b><br>"+(data[num].percent*100).toFixed(1)+"% repetitive<br><br>"
		$('#lyrics').html(str+data[num].lyric);
		$('#data').html(data[num].song+" by "+data[num].artist+"<br><i>"+data[num].genre+"</i>");
	});
}

function keepLyrics(num){
	$.getJSON("lyricsMap.json", function(data) {
		var str = "<b>"+data[num].song+"<br>"+data[num].artist+"</b><br>"+(data[num].percent*100).toFixed(1)+"%<br><br>"
		$('#lyrics').html(str+data[num].lyric);
		$('#data').html(data[num].song+" by "+data[num].artist+"<br><i>"+data[num].genre+"</i>");
	});
}

function drawSongGraph(num){
	$.getJSON("lyricsMap.json", function(data) {
		var lyrics = data[num].lyric;
		phraseCount = [];
		phrases = lyrics.split("<br/>");
		//create object to hold counts
		var counts = {};

		for(var i = 0; i< phrases.length; i++) {
		    var numb = phrases[i];
		    counts[numb] = counts[numb] ? counts[numb]+1 : 1;
		}

		var result = "";
		for (var i=0; i<phrases.length; i++){
			if (phrases[i] != ''){
				result += "<img  src='phrase.png' width='5px' height='"+counts[phrases[i]]+3+"px' style='opacity:0.8'>"	
			}
		}
		$('#graph').html(result);

		$('#graph').append("<br><br><i>This graph plots each phrase of the song with the height corresponding<br> to the number of that phrase's occurrences during the song</i>")
	});
}