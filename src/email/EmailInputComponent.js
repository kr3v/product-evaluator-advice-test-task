import './EmailInput.css'
import '../utils/FloatContainer.css'

import React, {Component} from "react";

export class EmailInputComponent extends Component {

    static DEFAULT = 0;
    static ACTIVE = 1;
    static INACTIVE = 2;

    static EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(props) {
        super(props);

        this.state = {emailState: EmailInputComponent.DEFAULT};
    }

    shouldErrorBeShown() {
        return (this.state.emailState === EmailInputComponent.INACTIVE || this.props.submitted)
            && !this.isEmailValid();
    }

    isEmailValid() {
        return EmailInputComponent.EMAIL_PATTERN.test(this.props.email)
    }

    render() {
        let error;
        if (this.isEmailValid()) {
            error = <></>
        } else {
            if (EmailInputComponent.ACTIVE === this.state.emailState || this.props.submitted) {
                error = <div className="absolute email-message-box">
                    <label className="absolute email-message email-message-box inline">Invalid Email address</label>
                </div>;
            } else {
                if (EmailInputComponent.INACTIVE === this.state.emailState) {
                    error = <label className="absolute email-icon fas fa-info-circle inline"/>;
                } else {
                    error = <></>;
                }
            }
        }

        return <div id="floatContainer" className="float-container">
            {error}
            <input type="email" id="email-input" formNoValidate={true}
                   className={"bordered" + (this.shouldErrorBeShown() ? " error" : "")}
                   placeholder="name@company.com"
                   onFocus={() => this.setState({emailState: EmailInputComponent.ACTIVE})}
                   onBlur={() => this.setState({emailState: EmailInputComponent.INACTIVE})}
                   onChange={e => this.props.handleEmailChange(e.target.value)}
                   value={this.props.email}/>
        </div>
    }
}