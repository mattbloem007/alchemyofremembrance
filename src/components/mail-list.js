import React from "react";
import SectionTitle from "./sectiontitle";
import { StaticQuery, graphql } from "gatsby";
import { PaperPlane, Mapmarker, Mobile, Envelope, Loading } from "./icons";
import SocialLinks from "./sociallinks";
import "../style/contact.less";

class MailList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitDisabled: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.showContactForm = true;

        if (this.props.contact.api_url === "") {
            this.showContactForm = false;
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (!this.state.submitDisabled) {
            this.setState({
                submitDisabled: true
            });

            let name = encodeURI(this.dataName.value),
                email = encodeURI(this.dataEmail.value),
                body = `name=${name}&email=${email}&message=${message}`;

                const result = await addToMailchimp(email, {FNAME: 'name'})
                  // I recommend setting `result` to React state
                  // but you can do whatever you want
                }
        }

    componentDidMount() {
        if (this.showContactForm) {
            let color = window
                .getComputedStyle(this.btn, null)
                .getPropertyValue("color");
            this.btn.querySelector("path").setAttribute("fill", color);
        }

        let li = this.contactArea.querySelectorAll(".item");

        li.forEach(function(e, i) {
            let p = e.querySelector("path");
            if (p)
                p.setAttribute(
                    "fill",
                    window.getComputedStyle(e, null).getPropertyValue("color")
                );
        });
    }

    render() {
        return (
            <section id="contact" className="container">
                <div className="section-title">
                    <SectionTitle title="Mailing List" />
                </div>
                <div
                    className={"row" + (this.showContactForm ? "" : " no-form")}
                    ref={c => (this.contactArea = c)}
                >
                    {this.showContactForm && (
                        <div className="col s12 m6">
                            <form method="post" netlify-honeypot="bot-field" data-netlify="true">
                             <input type="hidden" name="bot-field" />
                             <input type="hidden" name="form-name" value="contact" />
                                <div className="field">
                                    <label>
                                        <span className="label text-tertiary">
                                            Name
                                        </span>
                                        <div className="input-border">
                                            <input
                                                type="text"
                                                ref={c => (this.dataName = c)}
                                                className="field-box"
                                                name="name"
                                                id="name"
                                                required
                                            />
                                        </div>
                                    </label>
                                </div>
                                <div className="field">
                                    <label>
                                        <span className="label text-tertiary">
                                            Email
                                        </span>
                                        <div className="input-border">
                                            <input
                                                type="email"
                                                ref={c => (this.dataEmail = c)}
                                                className="field-box"
                                                name="email"
                                                id="email"
                                                required
                                            />
                                        </div>
                                    </label>
                                </div>
                                <div className="field">
                                    <label className="ib">
                                        <button
                                            className={
                                                "btn" +
                                                (this.state.submitDisabled
                                                    ? " disabled"
                                                    : "")
                                            }
                                            onClick={this.handleSubmit}
                                            id="submit"
                                            ref={c => (this.btn = c)}
                                        >
                                            SIGN ME UP{" "}
                                            <span
                                                className="icon paper-plane"
                                                style={{
                                                    display: this.state
                                                        .submitDisabled
                                                        ? "none"
                                                        : "inline-block"
                                                }}
                                            >
                                                <PaperPlane />
                                            </span>
                                            <span
                                                className="icon loading"
                                                style={{
                                                    display: !this.state
                                                        .submitDisabled
                                                        ? "none"
                                                        : "inline-block"
                                                }}
                                            >
                                                <Loading />
                                            </span>
                                        </button>
                                    </label>
                                    <label>
                                        <p
                                            className="res-message"
                                            ref={c => (this.resMessage = c)}
                                        ></p>
                                    </label>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        );
    }
  }


export default MailList
