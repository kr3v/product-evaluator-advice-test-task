import './Popup.css'

import React, {Component} from "react";

function Arrow() {
    return <svg width="8" height="8" className="arrow">
        <polygon points="-1,5 4,0 9,5" style={{fill: "white"}}/>
        <line x1="0" y1="4" x2="4" y2="0" style={{"stroke": "rgb(187, 187, 187)", "strokeWidth": 0.5}}/>
        <line x1="4" y1="0" x2="8" y2="4" style={{"stroke": "rgb(187, 187, 187)", "strokeWidth": 0.5}}/>
    </svg>;
}

class BigTooltip extends Component {
    render() {
        const hidden = this.props.state !== this.props.requiredState;
        return <div className={"hideable-block" + (hidden ? " hidden" : " not-hidden")} tabIndex="-1"
                    onFocus={() => this.props.onFocus(this.props.requiredState)}
                    onBlur={() => this.props.onBlur(this.props.requiredState)}>
            <Arrow/>
            {this.props.children}
        </div>;
    }
}

export class UrlSenPopup extends Component {
    static ALL_CLOSED = 0;
    static URL = 1;
    static SEN = 2;

    constructor(props) {
        super(props);

        this.state = {
            state: UrlSenPopup.ALL_CLOSED,
            focusOn: UrlSenPopup.ALL_CLOSED
        };
        this.openSenTooltip = this.openSenTooltip.bind(this);
        this.openUrlTooltip = this.openUrlTooltip.bind(this);
        this.defineState = this.defineState.bind(this);
        this.blur = this.blur.bind(this);
        this.focus = this.focus.bind(this);
    }

    openUrlTooltip() {
        if (this.state.state === UrlSenPopup.URL) {
            this.setState({state: UrlSenPopup.ALL_CLOSED})
        } else {
            this.setState({state: UrlSenPopup.URL});
        }
    }

    openSenTooltip() {
        if (this.state.state === UrlSenPopup.SEN) {
            this.setState({state: UrlSenPopup.ALL_CLOSED})
        } else {
            this.setState({state: UrlSenPopup.SEN});
        }
    }

    defineState() {
        if (this.state.focusOn > 0) return this.state.focusOn;
        else return this.state.state;
    }

    blur(source) {
        this.setState({state: UrlSenPopup.ALL_CLOSED});
        if ((source === UrlSenPopup.URL && this.state.focusOn === UrlSenPopup.URL) ||
            (source === UrlSenPopup.SEN && this.state.focusOn === UrlSenPopup.SEN)) {
            this.setState({focusOn: UrlSenPopup.ALL_CLOSED});
        }
    }

    focus(source) {
        this.setState({focusOn: source});
    }

    render() {
        return <div className="tooltip">
            <BigTooltip state={this.defineState()} requiredState={UrlSenPopup.URL}
                        onFocus={this.focus} onBlur={this.blur}>
                The URL will be the web address you visit to access your Atlassian product in the web. It will look
                similar to this:

                <blockquote>e.g. https://your-name.atlassian.net</blockquote>
            </BigTooltip>
            <button className="link-button" type="button" onClick={this.openUrlTooltip} onBlur={this.blur}>
                What is the URL?
            </button>
            <label style={{margin: "0px 4px"}}>·</label>
            <BigTooltip state={this.defineState()} requiredState={UrlSenPopup.SEN}
                        onFocus={this.focus} onBlur={this.blur}>
                The SEN is your Atlassian product's Support Entitlement Number, and looks like this:

                <blockquote>e.g. SEN-1234567</blockquote>

                For most people, the fastest way to get the SEN is to select Administration > License Details (or System
                Info) from inside your product.

                <br/>
                <a href="https://confluence.atlassian.com/support/finding-your-support-entitlement-number-229840018.html">Read
                    full instructions here</a>
            </BigTooltip>
            <button className="link-button" type="button" onClick={this.openSenTooltip} onBlur={this.blur}>
                What is the SEN?
            </button>
        </div>
    }
}