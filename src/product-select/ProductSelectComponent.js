import './ProductSelect.css'
import '../utils/FloatContainer.css'
import '../App.css'

import React, {Component} from "react";

class Webinar {
    constructor(has = false, href = "") {
        this.has = has;
        this.href = href;
    }
}

export class HostingOptionsBuilder {
    constructor(isAvailable, isDcHostingAvailable = true) {
        this.isAvailable = isAvailable;
        this.isDcHostingAvailable = isDcHostingAvailable;
    }

    static labelNameProvider(isTrialing, name) {
        return isTrialing
            ? "How are you planning to host your " + name + "?"
            : "What hosting option are you interested in?";
    }
}

class SelectionOption {
    constructor(name, hostingOptions = new HostingOptionsBuilder(true), trialingAvailable = true, webinar = new Webinar()) {
        this.name = name;
        this.hostingOptions = hostingOptions;
        this.trialingAvailable = trialingAvailable;
        this.webinar = webinar;

        hostingOptions.parentOption = this;
    }
}

class OtherSelectionOption {
    constructor(name) {
        this.name = name;
    }
}

class SelectionGroup {
    constructor(name, values) {
        this.name = name;
        this.values = values;

        values.forEach(option => option.parent = this);
    }
}

function Item(props) {
    return (
        <li>
            <button className="link-button" type="button"
                    onClick={() => props.handleItemSelect(props.option)}>
                {props.option.name}
            </button>
        </li>
    );
}

function SelectGroup(props) {
    return <>
        <li className="group">{props.name}</li>
        {props.values.map((option) =>
            <Item key={option.name} option={option} handleItemSelect={props.handleItemSelect}/>
        )}
    </>;
}

function HideAbleItems(props) {
    const hidden = props.hidden;
    return (
        <div className={"select-div bordered select-div-dropdown" + (hidden ? " hidden" : " not-hidden")}>
            <div className="flexed">
                <ul className="left">
                    {ProductSelect.SELECTS.filter((_, index) => index < 2).map((group) =>
                        <SelectGroup
                            key={group.name} name={group.name} values={group.values}
                            handleItemSelect={props.handleItemSelect}/>
                    )}
                </ul>
                <ul className="right">
                    {ProductSelect.SELECTS.filter((_, index) => index >= 2).map((group) =>
                        <SelectGroup
                            key={group.name} name={group.name} values={group.values}
                            handleItemSelect={props.handleItemSelect}/>
                    )}
                </ul>
            </div>
            <ul>
                <Item option={ProductSelect.OTHER_OPTION}
                      handleItemSelect={props.handleItemSelect}/>
            </ul>
        </div>
    );
}

export class ProductSelect extends Component {
    static OTHER_OPTION = new OtherSelectionOption("I'm not sure which products are right for me");
    static SELECTS = [
        new SelectionGroup("PLAN, TRACK, SUPPORT", [
            new SelectionOption("Jira Software"),
            new SelectionOption("Jira Service Desk", new HostingOptionsBuilder(true), true, new Webinar(true, "http://www.atlassian.com/software/jira/service-desk/demo?partnerref=pa-form")),
            new SelectionOption("Jira Core", new HostingOptionsBuilder(true, false)),
            new SelectionOption("Portfolio for Jira", new HostingOptionsBuilder(true, false), true, new Webinar(true, "https://www.atlassian.com/software/jira/portfolio/demo-video?partnerref=pa-form")),
            new SelectionOption("Jira Ops", new HostingOptionsBuilder(false)),
        ]),
        new SelectionGroup("CODE, BUILD, SHIP", [
            new SelectionOption("Bitbucket"),
            new SelectionOption("Sourcetree", new HostingOptionsBuilder(false)),
            new SelectionOption("Bamboo", new HostingOptionsBuilder(false)),
            new SelectionOption("Fisheye", new HostingOptionsBuilder(false)),
            new SelectionOption("Crucible", new HostingOptionsBuilder(false,))
        ]),
        new SelectionGroup("COLLABORATE & CHAT", [
            new SelectionOption("Confluence"),
            new SelectionOption("Hipchat", new HostingOptionsBuilder(false)),
            new SelectionOption("Stride", new HostingOptionsBuilder(false))
        ]),
        new SelectionGroup("ENTERPRISE", [
            new SelectionOption("Atlassian Stack", new HostingOptionsBuilder(false), false),
            new SelectionOption("Priority Support", new HostingOptionsBuilder(false), false),
            new SelectionOption("Premier Support", new HostingOptionsBuilder(false), false),
            new SelectionOption("Technical Account Manager", new HostingOptionsBuilder(false), false)
        ]),
        new SelectionGroup("IDENTITY & SECURITY", [
            new SelectionOption("Atlassian Access", new HostingOptionsBuilder(false), true),
            new SelectionOption("Crowd", new HostingOptionsBuilder(false), true)
        ])
    ];

    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            selected: " ",
            animation: 0
        };
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleItemSelect = this.handleItemSelect.bind(this);
    }

    handleDropdownClick() {
        this.setState({hidden: !this.state.hidden});
    }

    handleItemSelect(value) {
        this.props.handleItemSelect(value);
        this.setState({hidden: true});
    }

    render() {
        const hidden = this.state.hidden;
        return <div>
            <div className={"select-div bordered select-item-selection" + (hidden ? " hidden" : " not-hidden")}
                 onClick={this.handleDropdownClick}>
                <div className="float-container">
                    <span role="img" className="inline absolute select-item-selection-arrow">▼</span>
                    <label>{this.props.selectedProduct.name}</label>
                </div>
            </div>
            <HideAbleItems hidden={hidden} handleItemSelect={this.handleItemSelect}/>
        </div>;
    }
}