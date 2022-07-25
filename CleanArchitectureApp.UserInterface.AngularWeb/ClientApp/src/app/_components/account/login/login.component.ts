import { AuthenticationService } from './../../../_services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastService } from 'src/app/_services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
//import { NewapiService } from './../../../_services/newsapi/newapi.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  mArticles: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private injector: Injector // private newsapi: NewapiService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // this.newsapi.getArticleCountry('de').subscribe((data) => {
    //   // this.mArticles = data['articles'];
    //   console.log(data);
    // });
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authenticationService
      .login(
        this.formControls.username.value,
        btoa(this.formControls.password.value)
      )
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
          this.router.navigateByUrl(returnUrl);
          this.injector.get(ToastService).success('Authentication Successful');
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 422) {
              Object.keys(err.error.Errors).forEach((prop: any) => {
                const formControl = this.form.get(
                  err.error.Errors[prop].PropertyName.toLowerCase()
                );

                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: err.error.Errors[prop].ErrorMessage,
                  });
                }
              });
              this.injector.get(ToastService).danger('Authentication Failed');
            }
          }
        },
      });
  }
}
