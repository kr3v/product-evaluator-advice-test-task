import './Options.css'

import React, {Component} from 'react';
import {HostingOptionsBuilder} from "../product-select/ProductSelectComponent";

export class LicensingOption {
    static TRIAL = "trial";
    static ALREADY_CUSTOMER = "already_customer";
    static JUST_LOOKING = "just_looking";

    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class LicensingRadioButtonGroup extends Component {
    static buildOptions(option) {
        return (option.trialingAvailable
            ? [new LicensingOption(LicensingOption.TRIAL, "I'm trialing " + option.name)]
            : [])
            .concat([
                new LicensingOption(LicensingOption.ALREADY_CUSTOMER, "I'm already a " + option.name + " customer"),
                new LicensingOption(LicensingOption.JUST_LOOKING,
                    option.parent.name === "ENTERPRISE" ? "I'm not a " + option.name + " customer yet" : "I'm just looking"
                )
            ]);
    }

    render() {
        const option = this.props.option;
        const licensing = this.props.licensing;

        return <fieldset id="licensing">
            {LicensingRadioButtonGroup.buildOptions(option).map(licensingOption =>
                <label key={licensingOption.key} htmlFor={licensingOption.key} className="blocked">
                    <input id={licensingOption.key} type="radio"
                           onChange={() => this.props.handleLicensingSelect(licensingOption.key)}
                           checked={licensing === licensingOption.key}
                           value={licensingOption.key} name="licensing"/>
                    {licensingOption.value}
                </label>
            )}
        </fieldset>
    }
}

export class QuestionTypeSelect extends Component {
    static SOFTWARE = "software";
    static LICENSING = "licensing";
    static TRIAL_EXTENSION = "trial";
    static OTHER = "other";

    render() {
        const isTrial = this.props.isTrial;
        const product = this.props.product;

        if (product.parent.name === "ENTERPRISE") {
            return <></>;
        }

        return <>
            <label htmlFor="question-type">How can we help?</label>
            <select id="question-type" value={this.props.selected} className="bordered"
                    onChange={event => this.props.handleQuestionTypeSelect(event.target.value)}>
                <option hidden disabled value=""/>
                <option value={QuestionTypeSelect.SOFTWARE}>I have questions about how to use {product.name}</option>
                <option value={QuestionTypeSelect.LICENSING}>I have questions about pricing and licensing</option>
                {isTrial
                    ? <option value={QuestionTypeSelect.TRIAL_EXTENSION}>Can I get a trial extension</option>
                    : <></>
                }
                <option value={QuestionTypeSelect.OTHER}>Other</option>
            </select>
        </>;
    }
}

function HostingOptions(props) {
    const product = props.product;
    const isTrial = props.isTrial;
    const hostingLabel = HostingOptionsBuilder.labelNameProvider(isTrial, product.name);

    if (product.hostingOptions.isAvailable) {
        return <>
            <label htmlFor="hosting">{hostingLabel}</label>
            <fieldset id="hosting">
                <label key="atlassian" htmlFor="atlassian" className="blocked">
                    <input id="atlassian" type="radio" value="atlassian" name="hosting"/>
                    <strong>Atlassian hosts</strong> in the cloud for you
                </label>
                <label key="server" htmlFor="server" className="blocked">
                    <input id="server" type="radio" value="server" name="hosting"/>
                    <strong>You host</strong> on your server
                </label>
                {!product.hostingOptions.isDcHostingAvailable ? <></> :
                    <label key="dc" htmlFor="dc" className="blocked">
                        <input id="dc" type="radio" value="dc" name="hosting"/>
                        <strong>You host</strong> on your data center
                    </label>
                }
                <label key="not-sure" htmlFor="not-sure" className="blocked">
                    <input id="not-sure" type="radio" value="not-sure" name="hosting"/>
                    Not sure
                </label>
            </fieldset>
        </>
    } else {
        return <></>
    }
}

function TeamSizeOptions() {
    return <>
        <label htmlFor="team-size">What is your team size?</label>
        <fieldset id="team-size">
            <label key="50" htmlFor="50" className="blocked">
                <input id="50" type="radio" value="50" name="team-size"/>
                Less than 50
            </label>
            <label key="500" htmlFor="500" className="blocked">
                <input id="500" type="radio" value="500" name="team-size"/>
                50 - 500
            </label>
            <label key="inf" htmlFor="inf" className="blocked">
                <input id="inf" type="radio" value="inf" name="team-size"/>
                More than 500
            </label>
        </fieldset>
    </>
}

/**
 * Component for {@link LicensingOption.JUST_LOOKING} or {@link LicensingOption.TRIAL}
 */
function ProductInfoCollector(props) {
    const isTrial = props.isTrial;
    const product = props.product;

    return <>
        <div className="grouped">
            <HostingOptions product={product} isTrial={isTrial}/>
        </div>
        <div className="grouped">
            <TeamSizeOptions/>
        </div>
        <div className="grouped">
            <QuestionTypeSelect selected={props.questionType} isTrial={isTrial} product={product}
                                handleQuestionTypeSelect={props.handleQuestionTypeSelect}/>
        </div>
    </>;
}

export function OptionsFragment(props) {
    const product = props.product;
    const licensing = props.licensing;
    const questionType = props.questionType;

    const isTrial = licensing === LicensingOption.TRIAL;
    const justLooking = licensing === LicensingOption.JUST_LOOKING;

    return <>
        <div className="grouped">
            <LicensingRadioButtonGroup option={product} licensing={licensing}
                                       handleLicensingSelect={props.handleLicensingSelect}/>
        </div>
        {isTrial || justLooking
            ? <ProductInfoCollector isTrial={isTrial} product={product} questionType={questionType}
                                    handleQuestionTypeSelect={props.handleQuestionTypeSelect}/>
            : <></>}
    </>
}