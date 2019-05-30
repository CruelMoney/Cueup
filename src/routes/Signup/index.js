import React, {Component} from 'react';
import Signup from './components/Signup'; 
import { Helmet } from 'react-helmet-async';

import content from './content.json';
import addTranslate from '../../components/higher-order/addTranslate';
import thumbEn from '../../assets/images/signup.png';
import thumbDa from '../../assets/images/signup_da.png';
import {Environment} from '../../constants/constants'

class Index extends Component{
  render(){
    const {translate, currentLanguage} = this.props;
    const title = translate("apply-to-become-dj") + " | Cueup"
    const thumb = Environment.CALLBACK_DOMAIN + (currentLanguage === 'da' ? thumbDa : thumbEn);

    return(
      <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title"           content={title} />
        <meta name="twitter:title"      content={title} />

        <meta property="og:image"           content={thumb} />
        <meta name="twitter:image"              content={thumb} />

      </Helmet>
    <Signup translate={translate} />
    </div>
  )}
}

export default addTranslate(Index, content);