$(function() {
	module("$.combinations");
	
	test("$.combinations returns an array for every combination from a array of arrays", function() {
		var a = ["01", "02"],
			b = ["white", "green", "blue"],
			c = ["one", "two"],
			allOptionsArray = [a, b, c];
		
		var expected = [["01","white","one"], ["02","white","one"], ["01","green","one"], ["02","green","one"], ["01","blue","one"], ["02","blue","one"], ["01","white","two"], ["02","white","two"], ["01","green","two"], ["02","green","two"], ["01","blue","two"], ["02","blue","two"]];
		
		var actual = $.combinations(allOptionsArray);
		
		deepEqual(actual, expected, "$.combinations returns one array for each possible combination");
		
		equal(actual.length, expected.length, "$.combinations array has the expected length");
	});
	
	test("A simple example", function() {
		var a = ["01"],
			b = ["white", "green", "blue"],
			allOptionsArray = [a, b];
		
		var expected = [["01","white"], ["01","green"], ["01","blue"]];
		
		var actual = $.combinations(allOptionsArray);
		
		deepEqual(actual, expected, "$.combinations returns one array for each possible combination");
	});
	
	test("A slightly more complex example", function() {
		var a = ["01", "02", "03", "04"],
			b = ["white", "green", "blue", "red"],
			c = ["one", "two", "three", "four"],
			d = ["a", "b", "c", "d"],
			allOptionsArray = [a, b, c, d];
		
		var expectedLength = 256;
		
		var actualLength = $.combinations(allOptionsArray).length;
		
		equal(actualLength, expectedLength, "$.combinations array has the expected length");
	});
	
	test("A complex example", function() {
		var a = ["01", "02", "03", "04"],
			b = ["white", "green", "blue", "red"],
			c = [{"one":1}, {"two":2}, {"three":3}, {"four":4}],
			d = ["a", "b", "c", "d"],
			e = [1, 2, 3, 4, 5, 6, 7],
			f = ["A", "B", "C"],
			g = ['alpha', 'beta', 'charlie', 'delta', 'echo', 'foxtrot', 'gamma']
			allOptionsArray = [a, b, c, d, e, f, g];
		
		var expectedLength = 37632;
		var expectedFirstCombo = ["01", "white", {"one":1}, "a", 1, "A", 'alpha'];
		var expectedCombo2557 = [ "02", "red", {"four":4}, "d", 3, "B", "alpha" ];
		var expectedFinalCombo = ["04", "red", {"four":4}, "d", 7, "C", 'gamma'];
		
		var actual = $.combinations(allOptionsArray);
		var copy = actual.slice(0);
		var actualLength = actual.length;
		var actualCombo2557 = copy[2557];
		var actualFirstCombo = copy.shift();
		var actualFinalCombo = copy.pop();
		
		equal(actualLength, expectedLength, "$.combinations array has the expected length");
		deepEqual(actualFirstCombo, expectedFirstCombo, "The first combo returned by $.combinations as expected");
		deepEqual(actualCombo2557, expectedCombo2557, "The combo at index 2557 returned by $.combinations as expected");
		deepEqual(actualFinalCombo, expectedFinalCombo, "The last combo returned by $.combinations as expected");
	});
	
	test("$.combinations returns an array of arrays", function() {
		var a = ["01"],
			b = ["white", "green", "blue"],
			allOptionsArray = [a, b];
			
		var actual = $.combinations(allOptionsArray);
		expect(4);
		ok($.isArray(actual), "is an array");
		$.each(actual, function(i,v){
			ok($.isArray(v), "item " + i + " is an array");
		});
		
	});

	test("$.combinations returns an empty array if passed an empty array", function() {
		var a = [];
		
		var actual = $.combinations(a);
		equal(actual, [], "$.combinations returns an empty array");
	});

	test("$.combinations throws an error if it is passed anything but an array of arrays", function() {
		raises(function() {
			var anObject = {};
			$.combinations(anObject);
		}, "fails when passed an object");
		
		raises(function() {
			var anArrayOfObjects = [{}, {}, {}];
			$.combinations(anObject);
		}, "fails when passed an array of objects");
		
		raises(function() {
			var anObject = 'Come on!?!';
			$.combinations(anObject);
		}, "fails when passed a string");
		
		raises(function() {
			var anObject = 2;
			$.combinations(anObject);
		}, "fails when passed a number");
		
		ok($.combinations([[],[],[]]), "ok when passed an array of arrays");
	});
});
