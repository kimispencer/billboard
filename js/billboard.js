// test data
var billboard_data = {
    Album: "Teenage Dream (Deluxe Edition)", 
    Artist: "Katy Perry", 
    Lyrics: "There's a stranger in my bed,\nThere's a pounding in my head\nGlitter all over the room\nPink flamingos in the pool\nI smell like a minibar\nD J's passed out in the yard\nBarbie's on the barbeque\nThis a hickie or a bruise\n\nPictures of last night\nEnded up online\nI'm screwed\nOh well\nIt's a blacked out blur\nBut I'm pretty sure it ruled\nDamn\n\nLast Friday night\nYeah, we danced on tabletops\nAnd we took too many shots\nThink we kissed but I forgot\n\nLast Friday night\nYeah, we maxed our credit cards\nAnd got kicked out of the bar\nSo we hit the boulevard\n\nLast Friday night\nWe went streaking in the park\nSkinny dipping in the dark\nThen had a m\u00c3\u00a9nage \u00c3\u00a0 trois\nLast Friday night\nYeah I think we broke the law\nAlways say we're gonna stop\nOp-oh-oh\n\nThis Friday night\nDo it all again\nThis Friday night\nDo it all again\n\nTrying to connect the dots\nDon't know what to tell my boss\nThink the city towed my car\nChandeliers on the floor\nRipped my favorite party dress\nWarrant's out for my arrest\nThink I need a ginger ale\nThat was such an epic fail\n\nPictures of last night\nEnded up online\nI'm screwed\nOh well\nIt's a blacked out blur\nBut I'm pretty sure it ruled\nDamn\n\nLast Friday night\nYeah, we danced on table tops\nAnd we took too many shots\nThink we kissed but I forgot\n\nLast Friday night\nYeah, we maxed our credit cards\nAnd got kicked out of the bar\nSo we hit the boulevard\n\nLast Friday night\nWe went streaking in the park\nSkinny dipping in the dark\nThen had a m\u00c3\u00a9nage \u00c3\u00a0 trois\n\nLast Friday night\nYeah I think we broke the law\nAlways say we're gonna stop\nOh whoa oh\n\nThis Friday night\nDo it all again\n(Do it all again)\nThis Friday night\nDo it all again\n(Do it all again)\nThis Friday night\n\nT.G.I.F.\nT.G.I.F.\nT.G.I.F.\nT.G.I.F.\nT.G.I.F.\nT.G.I.F.\n\nLast Friday night\nYeah, we danced on table tops\nAnd we took too many shots\nThink we kissed but I forgot\n\nLast Friday night\nYeah, we maxed our credit cards\nAnd got kicked out of the bar\nSo we hit the boulevard\n\nLast Friday night\nWe went streaking in the park\nSkinny dipping in the dark\nThen had a m\u00c3\u00a9nage \u00c3\u00a0 trois\n\nLast Friday night\nYeah I think we broke the law\nAlways say we're gonna stop\nOh-whoa-oh\nThis Friday night\nDo it all again\n\n[Clapping] Whohoo!",      
    Track: "Last Friday Night (T.G.I.F.)", 
    Year: "2010", 
  }

// 1. calculate frequency of words from a string
function getWordFrequency(data) {
	var lyrics = data.Lyrics,
		freq = {};
	for (var i=0; i < lyrics; i++) {

	}
}

getWordFrequency(billboard_data);

// 2. use d3.js to layout words and size them by their frequency