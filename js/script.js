/* Author: BigAB - Adam Barrett
*  Demo Scripts
*/

$(function(){
	var $heroMachine = $('#hero-machine'),
		heroMachine = $heroMachine[0],
		$images = $();
		
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
		var imageDescriptions = [],
			$imagesToShow = $();
		$.each(states, function(i, state){
			state.unshift({});
			imageDescriptions.push($.extend.apply(this, state));
		});
		
		$.each(imageDescriptions, function(i, imageDesc){
			var id = $.map(imageDesc, function(v,key){ return v }).join('_');
			
			if ($images.filter('#'+id).length) {
				console.log('found: #%s', id);
				$imagesToShow = $imagesToShow.add($images.filter('#'+id));
			} else {
				var $img = createImage(imageDesc);
				console.log('created: %o', $img);
				$images = $images.add($img);
				$imagesToShow = $imagesToShow.add($img);
			}
		});
		
		$('.display').children().remove().end().append($imagesToShow);
	});
	
	function createImage(params) {
		var $img = $('<div/>').attr({
			id: $.map(params, function(v,key){ return v }).join('_'),
			'class': 'hero-image'
		});
		$img.text($.map(params, function(v,key){ return v }).join('\n'));
		return $img;
	}
});





















