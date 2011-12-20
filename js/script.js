/* Author: BigAB - Adam Barrett
*  Demo Scripts
*/

$(function(){
	var $heroMachine = $('#hero-machine'),
		$display = $('.display'),
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
	
	$display.delegate('canvas', 'click', function(e){
		var $this = $(this),
			$actives;
		
		if ($this.hasClass('active')) {
			$this.removeClass('active');
		}
		else {
			$actives = $display.find('.active');
			$actives.removeClass('active');
			$this.addClass('active');
		}
	})
	
	$.subscribe('change.control', function(states){
		var imageDescriptions = [],
			$imagesToShow = $(),
			$display = $('.display'),
			$activeImages;
		
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
		
		$activeImages = $display.find('.active');
		$display.children().remove().removeClass('active').end().append($imagesToShow);
		$display.children().filter($activeImages).addClass('active');
	});
	
	function createImage(params) {
		var canvas = $('<canvas>').attr({
				height: 300,
				width: 200,
				id: $.map(params, function(v,key){ return v }).join('_')
			}).get(0),
			ctx = canvas.getContext('2d'),
			srcs = [];
			
			$.each(params, function(key,val){
				var filename = val;
				if (key === 'hair') { filename = (params.gender ? params.gender : 'male') + '-hair-' + filename }
				if (key === 'outfit') { filename = (params.gender ? params.gender : 'male') + '-outfit-' + filename }
				srcs.push('images/'+ filename +'.png');
			});
			
			preloadImages(srcs).done(function(arg){
				$.each(srcs, function(i,val){
					var img = $("<img />").attr('src', val).get(0);
					ctx.drawImage(img,0,0,200,300);
				});
				
			});
			
		
		//$img.text($.map(params, function(v,key){ return v }).join('\n'));
		return $(canvas);
	}
	
	function preloadImages(srcs) {
		var dfd = $.Deferred(), promises = [], img, len, deferred;
		
		if(!$.isArray(srcs)) {
			srcs = [srcs];
		}
		
		for(var i = 0, len = srcs.length; i < len; ++i) {
			deferred = $.Deferred();
			img = $("<img />");

			img.load(deferred.resolve);
			img.error(deferred.resolve);

			promises.push(deferred);

			img.attr('src',srcs[i]);
		}

		$.whenArray(promises).done(dfd.resolve);
		return dfd.promise();
	}

	jQuery.whenArray = function ( array ) {
		return jQuery.when.apply( this, array );
	};
});





















