import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-prep',
    templateUrl: './prep.component.html'
})
export class PrepComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.route.queryParams.subscribe(
            (params) => {
                localStorage.setItem('btToken', params['tkn']);
                this.router.navigate(['/default/company/list']);
            }
        );
    }


}
