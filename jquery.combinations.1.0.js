/*
* jQuery combinations - v1.0 - 29/10/2011
* http://github.com/bigab/jquery/jquery-combinations-plugin/
*
* Copyright (c) 2011 "BigAB" Adam Barrett
* licensed under the MIT license.
* http://bigab.mit-license.org
* 	@author BigAB - Adam Barrett
*/
(function($) {
	$.combinations = function(arrayOfArrays) {
		if (Object.prototype.toString.call(arrayOfArrays) !== '[object Array]') {
			throw new Error("combinations method was passed a non-array argument");
		}
		
		var combinations = [],
			comboKeys = [],
			numOfCombos = 1,
			arrayOfArraysLength = arrayOfArrays.length;
		
		for(var n = 0; n < arrayOfArraysLength; ++n) {
			if(Object.prototype.toString.call(arrayOfArrays[n]) !== '[object Array]') {
				throw new Error("combinations method was passed a non-array argument");
			}
			numOfCombos = numOfCombos*arrayOfArrays[n].length;
		}
		
		for(var x = 0; x < numOfCombos; ++x) {
			var carry = x,
				comboKeys = [],
				combo = [];
			
			for(var i = 0; i < arrayOfArraysLength; ++i) {
				comboKeys[i] = carry % arrayOfArrays[i].length;
				carry = Math.floor(carry / arrayOfArrays[i].length);
			}
			for(var i = 0; i < comboKeys.length; ++i) {
				combo.push(arrayOfArrays[i][comboKeys[i]]);
			}
			combinations.push(combo);
		}
		
		return combinations;
	}
})(jQuery);