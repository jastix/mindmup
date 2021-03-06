/*global MM, $*/
MM.Extensions.progress = function () {
	'use strict';
	var statusConfigurationAttributeName = MM.Extensions.config.progress.aggregateAttributeName,
		statusAttributeName = 'progress',
		mapController = MM.Extensions.components.mapController,
		mapModel = MM.Extensions.components.mapModel,
		loadUI = function (html) {
			var parsed = $(html),
				menu = parsed.find('[data-mm-role=top-menu]').clone().appendTo($('#mainMenu')),
				toolbar = parsed.find('[data-mm-role=floating-toolbar]').clone().appendTo($('body')).draggable().css('position', 'absolute'),
				modal = parsed.find('[data-mm-role=modal]').clone().appendTo($('body')),
				updater;
			$('#mainMenu').find('[data-mm-role=optional]').hide();
			updater = new MM.ContentStatusUpdater(statusAttributeName, statusConfigurationAttributeName, mapController);
			menu.progressStatusUpdateWidget(updater, mapModel, MM.Extensions.progress.statusConfig);
			toolbar.progressStatusUpdateWidget(updater, mapModel, MM.Extensions.progress.statusConfig);
			modal.tableEditWidget(updater.refresh.bind(updater)).progressStatusUpdateWidget(updater, mapModel, MM.Extensions.progress.statusConfig);

		};
	$.get('/' + MM.Extensions.mmConfig.cachePreventionKey + '/e/progress.html', loadUI);
	$('<link rel="stylesheet" href="' +  MM.Extensions.mmConfig.cachePreventionKey + '/e/progress.css" />').appendTo($('body'));
};

MM.Extensions.progress.statusConfig = {};
MM.Extensions.progress.statusConfig.testing = {
	'': {
		description: 'Not Started',
		priority: 1,
		style: {
			background: false
		}
	},
	'passing': {
		description: 'Passed',
		style: {
			background: '#00CC00'
		}
	},
	'in-progress': {
		description: 'In Progress',
		priority: 2,
		style: {
			background: '#FFCC00'
		}
	},
	'failure': {
		description: 'Failed',
		priority: 999,
		style: {
			background: '#FF3300'
		}
	}
};
MM.Extensions.progress.statusConfig.tasks = {
	'': {
		description: 'Not Started',
		priority: 1,
		style: {
			background: false
		}
	},
	'passing': {
		description: 'Done',
		style: {
			background: '#00CC00'
		}
	},
	'under-review' : {
		description: 'Under review',
		style: {
			background: '#00CCFF'
		}
	},
	'in-progress': {
		description: 'In Progress',
		priority: 3,
		style: {
			background: '#FFCC00'
		}
	},
	'blocked': {
		description: 'Blocked',
		priority: 4,
		style: {
			background: '#990033'
		}
	},
	'parked': {
		description: 'Parked',
		priority: 2,
		style: {
			background: '#FF3300'
		}
	}
};
MM.Extensions.progress();
