import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
            <div className="container">
                <div className="row">
                    {/* Column 1 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>MOOC Business</h4>
                        <ul className="list-unstyled">
                            <li>Teach here</li>
                            <li>Partners</li>
                            <li>Get the App</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    {/* Column 2 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>MOOC Business</h4>
                        <ul className="list-unstyled">
                            <li><a href="/">Teach here</a></li>
                            <li><a href="/">Partners</a></li>
                            <li><a href="/">Get the App</a></li>
                            <li><a href="/">About Us</a></li>
                            <li><a href="/">Contact Us</a></li>
                        </ul>
                    </div>
                    {/* Column 3 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Official</h4>
                        <ul className="list-unstyled">
                            <li><a href="/">Careers</a></li>
                            <li><a href="/">Blog</a></li>
                            <li><a href="/">Help and Support</a></li>
                            <li><a href="/">Affiliate</a></li>
                            <li><a href="/">Investors</a></li>
                        </ul>
                    </div>
                    {/* Column 3 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Development</h4>
                        <ul className="list-unstyled">
                            <li><a href="/">Terms</a></li>
                            <li><a href="/">Privacy policy</a></li>
                            <li><a href="/">Sitemap</a></li>
                            <li><a href="/">Accessibility</a></li>
                            <li><a href="/">Statement</a></li>
                        </ul>
                    </div>
                </div>
                {/* Footer Bottom*/}
                <div className="footer-bottom">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} MOOC - All Rights Reserved
                    </p>
                </div>
            </div>
            </div>
        </FooterContainer>
    );
}
export default Footer;

const FooterContainer = styled.footer`
    .footer-middle {
        background: var(--mainDark);
        padding-top: 3rem;
        color: var(--mainWhite);
    }
    
    .footer-bottom {
        padding-top: 3rem;
        padding-bottom: 2rem;
    }

    ul li a {
        color: var(--mainGrey);
    }

    ul li a:hover {
        color: var(--mainLightGrey);
    }
`;