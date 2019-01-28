import './App.css';

import React, {Component} from 'react';
import {EmailInputComponent} from "./email/EmailInputComponent";
import {ProductSelect} from "./product-select/ProductSelectComponent";
import {OptionsFragment, QuestionTypeSelect, LicensingOption} from "./options/Options";
import {TicketForm} from "./ticket/Ticket";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            question: "",
            selectedProduct: "",
            selectedLicensing: "",
            selectedQuestionType: "",
            selectedProductHelp: "",
            submitted: false
        };
        this.handleItemSelect = this.handleItemSelect.bind(this);
        this.handleLicensingSelect = this.handleLicensingSelect.bind(this);
        this.handleQuestionTypeSelect = this.handleQuestionTypeSelect.bind(this);
        this.handleSelectedProductHelp = this.handleSelectedProductHelp.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.afterSubmitBlur = this.afterSubmitBlur.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleItemSelect(value) {
        this.setState({
            selectedProduct: value,
            selectedLicensing: "",
            selectedQuestionType: "",
        })
    }

    handleLicensingSelect(value) {
        this.setState({
            selectedLicensing: value,
            selectedQuestionType: ""
        });
    }

    handleQuestionTypeSelect(value) {
        this.setState({selectedQuestionType: value});
    }

    handleQuestionChange(value) {
        this.setState({question: value});
    }

    handleSelectedProductHelp(value) {
        this.setState({selectedProductHelp: value});
    }

    afterSubmitBlur() {
        this.setState({submitted: false});
    }

    submit() {
        this.setState({submitted: true});
    }

    render() {
        const product = this.state.selectedProduct;
        const licensing = this.state.selectedLicensing;
        const questionType = this.state.selectedQuestionType;

        const isSourcetree = product.name === "Sourcetree";
        const isAlreadyCustomer = licensing === LicensingOption.ALREADY_CUSTOMER;
        const areOptionsRequired = !(product === ProductSelect.OTHER_OPTION || product === "");
        const isGenericTextareaRequired = questionType === "" && !isAlreadyCustomer;

        return <form>
            <h1>Product advice</h1>
            <h2>Have a question for us?</h2>
            <div className="grouped">
                <label htmlFor="email">Your work email address</label>
                <EmailInputComponent id="email" email={this.state.email} submitted={this.state.submitted}
                                     handleEmailChange={email => this.setState({"email": email})}/>
            </div>
            <div className="grouped">
                <label htmlFor="select-item">Which product would you like advice on?</label>
                <ProductSelect id="select-item"
                               handleItemSelect={this.handleItemSelect}
                               selectedProduct={product}/>
            </div>
            {areOptionsRequired
                ? <div className="grouped">
                    <OptionsFragment
                        product={product} licensing={licensing} questionType={questionType}
                        handleQuestionTypeSelect={this.handleQuestionTypeSelect}
                        handleLicensingSelect={this.handleLicensingSelect}/>
                </div> : <></>
            }
            {questionType !== "" || isAlreadyCustomer
                ? <div className="grouped">
                    <TicketForm question={this.state.question} selectedProductHelp={this.state.selectedProductHelp}
                                product={product} licensing={licensing}
                                isTrialExtension={questionType === QuestionTypeSelect.TRIAL_EXTENSION}
                                handleQuestionChange={this.handleQuestionChange}
                                handleSelectedProductHelp={this.handleSelectedProductHelp}/>
                </div> : <></>}
            {isGenericTextareaRequired
                ? <div className="grouped">
                    <label htmlFor="question">Your question</label>
                    <textarea rows="4" id="question" className="bordered" value={this.state.question}
                              onChange={e => this.handleQuestionChange(e.target.value)}/>
                </div> : <></>
            }
            {!(isSourcetree && isAlreadyCustomer)
                ? <>
                    <div className="disclaimer grouped">
                        Your session will be monitored for training purposes to ensure we are providing the most
                        useful
                        and helpful answers. Please do not include personal information in the body of your
                        question.
                    </div>
                    <div className="grouped">
                        <input type="button" value="Send" className="submit" onClick={this.submit}
                               onBlur={this.afterSubmitBlur}/>
                    </div>
                </> : <></>
            }
        </form>;
    }
}

export default App;
