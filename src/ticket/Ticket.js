import './Ticket.css'

import React, {Component} from 'react';
import {UrlSenPopup} from './Popup';
import {LicensingOption} from '../options/Options';
import {ProductSelect} from '../product-select/ProductSelectComponent';

function BlueBox(props) {
    return <div className={"blueBox " + (props.hasOr ? " or" : "")}>
        {props.children}
        <br/>
        <br/>
        <a href={props.href} className="bordered button">
            {props.button}
        </a>
    </div>
}

function BlueBoxComponent(props) {
    const isTrialExtension = props.isTrialExtension;
    const product = props.product;
    const isAlreadyCustomer = props.isAlreadyCustomer;

    if (isTrialExtension) {
        return <BlueBox button="Extend server trial online" hasOr={true}
                        href="https://www.atlassian.com/licensing/purchase-licensing#evaluations-2">
            <label>
                If you host on <strong>your own server</strong> and you are
                a <strong>billing</strong> or <strong>technical</strong> contact you
                can extend your trial online
            </label>
        </BlueBox>;
    } else if (isAlreadyCustomer) {
        return <BlueBox button="Raise a support ticket" hasOr={true} href="https://support.atlassian.com/contact/">
            <label>
                We have a tech support team dedicated to helping existing <br/>
                customers with all of their product questions
            </label>
        </BlueBox>;
    } else if (product.webinar.has) {
        return <BlueBox button="Sign up for the webinar" hasOr={false} href={product.webinar.href}>
            <label>
                Sign up now for the weekly {product.name} webinar.
                <br/>
                Or contact one of our
                250 <a href="https://www.atlassian.com/partners/search" className="white">solution
                partners</a> worldwide
                if you’d like a custom demo.
            </label>
        </BlueBox>;
    } else {
        return <></>;
    }
}

function Star() {
    return <span className="star">*</span>
}

class SourcetreeCustomerForm extends Component {
    render() {
        return <div className="lightBlueBox centrified">
            <label>
                Atlassian supports Sourcetree through the Atlassian Community.
                <br/>
                Here you can find hundreds of Sourcetree users helping each other, as well as Atlassian developers and
                support staff who can answer your more technical questions.
            </label>
            <br/>
            <br/>
            <a className="dark-button bordered" href="https://community.atlassian.com/t5/Sourcetree/ct-p/sourcetree">
                Ask the Community
            </a>
        </div>
    }
}

class AlreadyCustomerEnterpriseForm extends Component {
    render() {
        const product = this.props.product;

        return <>
            <BlueBoxComponent product={product} isAlreadyCustomer={true}/>
            <div className="lightBlueBox">
                <h4>Please provide us the following <br/> so we can best assist you</h4>

                <div className="grouped">
                    <label>Which product do you need help with? <Star/></label>
                    <select id="product-enterprise-help" value={this.props.selectedProductHelp}
                            onChange={event => this.props.handleSelectedProductHelp(event.target.value)}
                            className="bordered">
                        <option hidden disabled value=""/>
                        {ProductSelect.SELECTS
                            .filter(group => group.name !== 'ENTERPRISE' && group.name !== 'IDENTITY & SECURITY')
                            .flatMap(group => group.values)
                            .map(option =>
                                <option key={option.name} value={option.name}>{option.name}</option>
                            )}
                    </select>
                </div>

                <div className="grouped">
                    <label htmlFor="firstName">Full name <Star/></label>
                    <br/>
                    <input id="firstName" className="bordered" placeholder="First name"
                           style={{width: "40%", marginRight: "16px"}} required/>
                    <input id="lastName" className="bordered" placeholder="Last name" style={{width: "40%"}} required/>
                </div>

                <div className="grouped">
                    <label htmlFor="url">
                        Your {this.props.selectedProductHelp === '' ? 'Atlassian product ' : this.props.selectedProductHelp}
                        <strong> URL</strong> or <strong>SEN</strong>
                        <Star/>
                    </label>
                    <input id="url" className="bordered" required/>
                    <UrlSenPopup/>
                </div>

                <div className="grouped">
                    <label htmlFor="topic">Topic / summary <Star/></label>
                    <input id="topic" className="bordered" required/>
                </div>

                <div className="grouped">
                    <label htmlFor="question">Your question <Star/></label>
                    <textarea rows="4" id="question" className="bordered" value={this.props.question}
                              onChange={e => this.props.handleQuestionChange(e.target.value)}/>
                </div>
            </div>
        </>;
    }
}

class AlreadyCustomerForm extends Component {
    render() {
        const product = this.props.product;

        return <>
            <BlueBoxComponent product={product} isAlreadyCustomer={true}/>
            <div className="lightBlueBox">
                <h4>Please provide us the following <br/> so we can best assist you</h4>

                <div className="grouped">
                    <label htmlFor="firstName">Full name <Star/></label>
                    <br/>
                    <input id="firstName" className="bordered" placeholder="First name"
                           style={{width: "40%", marginRight: "16px"}} required/>
                    <input id="lastName" className="bordered" placeholder="Last name" style={{width: "40%"}} required/>
                </div>

                <div className="grouped">
                    <label htmlFor="url">Your {product.name} <strong>URL</strong> or <strong>SEN</strong>
                        <Star/></label>
                    <input id="url" className="bordered" required/>
                    <UrlSenPopup/>
                </div>

                <div className="grouped">
                    <label htmlFor="topic">Topic / summary <Star/></label>
                    <input id="topic" className="bordered" required/>
                </div>

                <div className="grouped">
                    <label htmlFor="question">Your question <Star/></label>
                    <textarea rows="4" id="question" className="bordered" value={this.props.question}
                              onChange={e => this.props.handleQuestionChange(e.target.value)}/>
                </div>
            </div>
        </>
    }
}

class TrialingForm extends Component {
    render() {
        const isTrialExtension = this.props.isTrialExtension;
        const product = this.props.product;

        return <>
            <BlueBoxComponent product={product} isTrialExtension={isTrialExtension}/>
            <div className="lightBlueBox">
                <h4>Please provide us the following <br/> so we can best assist you</h4>

                {isTrialExtension
                    ? <div className="grouped">
                        <label
                            htmlFor="url">Your {product.name} trial <strong>URL</strong> or <strong>SEN</strong></label>
                        <input id="url" className="bordered"/>
                        <UrlSenPopup/>
                    </div>
                    : <div className="grouped">
                        <label htmlFor="tools">What tools are you using today?</label>
                        <input id="tools" className="bordered"/>
                    </div>}

                <div className="grouped">
                    <div>{isTrialExtension ?
                        <label htmlFor="question">Tell us why you need an extension and we'll extend your trial</label>
                        : <label htmlFor="question">Your question</label>
                    }</div>
                    <textarea rows="4" id="question" className="bordered" value={this.props.question}
                              onChange={e => this.props.handleQuestionChange(e.target.value)}/>
                </div>
            </div>
        </>
    }
}

export class TicketForm extends Component {
    render() {
        const isTrialExtension = this.props.isTrialExtension;
        const product = this.props.product;

        if (this.props.licensing === LicensingOption.ALREADY_CUSTOMER) {
            if (product.name === "Sourcetree") {
                return <SourcetreeCustomerForm/>;
            } else if (product.parent.name === "ENTERPRISE") {
                return <AlreadyCustomerEnterpriseForm product={product}
                                                      selectedProductHelp={this.props.selectedProductHelp}
                                                      handleSelectedProductHelp={this.props.handleSelectedProductHelp}/>
            } else {
                return <AlreadyCustomerForm product={product}/>;
            }
        } else {
            return <TrialingForm question={this.props.question} product={product} isTrialExtension={isTrialExtension}
                                 handleQuestionChange={this.props.handleQuestionChange}/>;
        }
    }
}