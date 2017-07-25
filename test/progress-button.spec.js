describe('progress-button directive', function() {
	var element, scope, barElement, buttonTextElement

	beforeEach(function() {
		module('progressButton')
		inject(function($rootScope, $compile) {
			scope = $rootScope.$new()
		})
	})

	function compileDirective(template) {
		console.log("Compile");
		element = angular.element(template)
		inject(function($rootScope, $compile) {
			$compile(element)(scope)
			$rootScope.$digest()

			barElement = angular.element(element[0].querySelectorAll('.progress-button-bar'))
			buttonTextElement = angular.element(element[0].querySelectorAll('.progress-button-text'))
		})
	}

	it('shows the button’s inner text if progress = 0', function() {
		compileDirective('<progress-button value="progress">Button</progress-button>')

		scope.progress = 0

		expect(element.text()).toBe('Button')
	})

	it('shows the default in-progress text if progress = 0.5', function() {
		compileDirective('<progress-button value="progress">Button</progress-button>')
		scope.$apply()
		
		scope.progress = 0.5
		
		scope.$apply()
		console.log("Text:" + buttonTextElement.text());
		expect(buttonTextElement.text()).toBe('Loading…')
	})

	it('shows the default completion text if progress = 1.0', function() {
		compileDirective('<progress-button value="progress">Button</progress-button>')

		scope.progress = 1.0
		scope.$apply()

		expect(buttonTextElement.text()).toBe('Complete.')
	})

	it('shows the specified in-progress text if applicable', function() {
		compileDirective('<progress-button value="progress" in-progress="Text">Button</progress-button>')

		scope.progress = 0.5
		scope.$apply()

		expect(buttonTextElement.text()).toBe('Text')
	})

	it('shows the specified completion text if applicable', function() {
		compileDirective('<progress-button value="progress" complete="Text">Button</progress-button>')

		scope.progress = 1.0
		scope.$apply()

		expect(buttonTextElement.text()).toBe('Text')
	})

	it('sets the bar’s width to 50% if progress = 0.5', function() {
		compileDirective('<progress-button value="progress">Button</progress-button>')

		scope.progress = 0.5
		scope.$apply()

		inject(function($timeout) { $timeout.flush() })

		expect(barElement.css('width')).toBe('50%')
	})

	it('sets the bar’s height to 50% if progress = 0.5 and type = vertical', function() {
		compileDirective('<progress-button value="progress" type="vertical">Button</progress-button>')

		scope.progress = 0.5
		scope.$apply()

		inject(function($timeout) { $timeout.flush() })

		expect(barElement.css('height')).toBe('50%')
	})

	it('sets the bar’s width to 0% if progress < 0', function() {
		compileDirective('<progress-button value="progress">Button</progress-button>')

		scope.progress = -1.0
		scope.$apply()

		inject(function($timeout) { $timeout.flush() })

		expect(barElement.css('width')).toBe('0%')
	})

	it('sets the bar’s width to 100% if progress > 1.0', function() {
		compileDirective('<progress-button value="progress">Button</progress-button>')

		scope.progress = 2.0
		scope.$apply()

		inject(function($timeout) { $timeout.flush() })

		expect(barElement.css('width')).toBe('100%')
	})
})
