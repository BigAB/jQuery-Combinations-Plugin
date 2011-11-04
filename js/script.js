/* Author: BigAB - Adam Barrett
*  Demo Scripts
*/

$(function(){
	var $heroMachine = $('#hero-machine'),
		heroMachine = $heroMachine[0];
		
	$heroMachine.delegate(':checkbox', 'click', function(e){
		var controlValues = [],
			nameKeysObj ={},
			availableNames = [],
			combinations;
		
		$(':checkbox', heroMachine).each(function(i,v){
			if (!nameKeysObj[v.name]){
				nameKeysObj[v.name]= true;
				availableNames.push(v.name);
			}
		});
		
		$.each(availableNames, function(i,v){
			var $options = $(':checkbox[name='+v+']', heroMachine),
			    nameValPairs = $.map($options.filter(':checked'), function(v,i){
					var o = {};
					o[v.name] = v.value;
					return o;
				});
			if (nameValPairs.length) controlValues.push(nameValPairs);
		});
		
		// IMPORTANT PART HERE:
		combinations = $.combinations(controlValues);
		
		$.publish('change.control', combinations);
	});
	
	
	$.subscribe('change.control', function(states){
		console.log('states: %o', states);
		var images = [];
		$.each(states, function(i, state){
			state.unshift({});
			images.push($.extend.apply(this, state));
		});
		
		$.each(images, function(i,image){
			createImage(image);
		});
	});
	
	function createImage(params) {
		console.log('Make an image: %o', params);
	}
});





















