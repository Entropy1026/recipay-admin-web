export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Pages',
					'root': true,
					'icon-': 'flaticon-add',
					'toggle': 'click',
					'custom-class': 'kt-menu__item--active',
					'alignment': 'left',
					submenu: []
				},
				{
					'title': 'Features',
					'root': true,
					'icon-': 'flaticon-line-graph',
					'toggle': 'click',
					'alignment': 'left',
					submenu: []
				},
				{
					'title': 'Apps',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'alignment': 'left',
					submenu: []
				}
			]
		},
		aside: {
			self: {},
			items: [
				// {
				// 	title: 'Dashboard',
				// 	root: true,
				// 	icon: 'flaticon2-architecture-and-city',
				// 	page: 'dashboard',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// },
				{
					title: 'Order',
					root: true,
					bullet: 'dot',
					icon: 'la la-shopping-cart',
					submenu: [
						{
							title: 'List',
							page: 'order/list'
						},
						{
							title: 'Preparation',
							page: 'order/preparation'
						}

					] 
				},
				{
					title: 'Menu',
					root: true,
					bullet: 'dot',
					icon: 'la la-shopping-cart',
					submenu: [
						{
							title: 'List',
							page: 'menu/list'
						}
					] 
				},
				{
					title: 'Inventory',
					root: true,
					bullet: 'dot',
					icon: 'la la-archive',
					submenu: [
						{
							title: 'List',
							page: 'inventory/list'
						}
					] 
				},
				{
					title: 'Report',
					root: true,
					bullet: 'dot',
					icon: 'la la-eye',
					submenu: [
						{
							title: 'List',
							page: 'report/list'
						}
					] 
				},
				{
					title: 'User',
					root: true,
					bullet: 'dot',
					icon: 'la la-users',
					submenu: [
						{
							title: 'List',
							page: 'user/list'
						}
					] 
				},
				{
					title: 'Review',
					root: true,
					bullet: 'dot',
					icon: 'la la-comments-o',
					submenu: [
						{
							title: 'List',
							page: 'review/list'
						},
						{
							title: 'Dispute',
							page: 'review/dispute'
						}
					] 
				},
				{
					title: 'Advertisement',
					root: true,
					bullet: 'dot',
					icon: 'la la-bullhorn',
					submenu: [
						{
							title: 'List',
							page: 'advertisement/list'
						}
					] 
				},
				// {
				// 	title: 'Layout Builder',
				// 	root: true,
				// 	icon: 'flaticon2-expand',
				// 	page: 'builder'
				// },
				// {section: 'Custom'},
				// {
				// 	title: 'Custom Link',
				// 	root: true,
				// 	icon: 'flaticon2-link',
				// 	bullet: 'dot',
				// },
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
