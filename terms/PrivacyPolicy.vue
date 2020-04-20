<template>
  <div class = "body" @viewappear="onViewAppear" @viewdisappear="onViewDisappear">
    <StatusBar ref="statusBar" :statusBarWhite = "false"></StatusBar>

    <web src="https://tv.doubimeizhi.com/webpages/aihome/policy.html" class="webview"></web>
     <div style="width: 100px;height: 100px;position:absolute; top:68px;left:48px;"  @click="back()">
         <div class="iconContent">
          <text style='font-family:iconfont1;font-size:48px;color:#3E3E3E;'>&#xe608;</text>
         </div>
      </div>
  </div>
</template>

<style scoped>
  .body {
    flex: 1;
    background-color: #fbfbfb;
  }
   .iconContent {
    width: 48px;
    height: 48px;
  }
  .bar_back{
    width: 50px;
    height: 50px;
    margin-left: 33px;
    margin-top: 83px;
  }
  .about_vhome_navigation_bar{
    background-color: #44D6BA ;
    flex-direction: row;
    width: 750px;
    height: 167px;
  }
  .about_vhome_bar_back_ico{
    width: 50px;
    height: 50px;
    margin-left: 33px;
    margin-top: 83px;
  }
  .about_vhome_text{
    height: 58px;
    margin-left: 208px;
    margin-top: 79px;
    font-size: 38px;
    font-family: "PingFang SC";
    color: #FFFFFF;
    font-weight: bold;
  }
  .mine_middle{
    width: 750px;
    /*height: 1167px;*/
    /* background-color: #F3F6F9; */
  }
  .about_vhome_us_introduce{
    width: 750px;
    background-color: #FFFFFF;
    padding-right: 40px;
    padding-left: 40px;
    margin-top: 33px;
  }
  .about_vhome_us_introduce_text{
    /*margin-left: 40px;*/
    margin-top: 46px;
  }
  .about_vhome_us_introduce_text_font{
    font-size: 30px;
    color: #3E3E3E;
    font-family: "PingFang SC";
  }
  .webview{
    flex:1;
  }
</style>

<script>
  const navigator = weex.requireModule('navigator')
  export default {
    data () {
      return {
        content:'Skyworth RGB Electronics Ltd  ("Skyworth", "we", "us" or "our") develops this Privacy Policy in accordance with current laws, regulations and policies. We are committed to protecting your personal data.\n'
            +'\n'
            + 'What does this policy cover?\n'
            +'\n'
            + 'This Privacy Policy describes the processing of your personal data and applies to Skyworth\'s devices, websites and Apps that reference or link to this Privacy Policy, including but not limited to the AI Home App (collectively referred to as "our services"). \n'
            +'\n'
            + 'Summary of how we use your data\n'
            +'\n'
            + 'We use your personal data as is required for the purposes of providing our services to you, communicating with you, conducting research and surveys to improve our services, and for purposes of compliance, regulatory and legal and other purposes detailed in Section II.\n'
            +'\n'
            + 'Data is shared with our affiliates and authorized partners for purposes set out in this privacy policy, and to other parties including government authorities and/or law enforcement officials as may be required by applicable laws. For more details refer to Section III.\n'
            +'\n'
            + 'Where we rely on your consent, such as for marketing purposes or providing third parties with access to your personal data, you can withdraw this consent at any time.\n'
            +'\n'
            + 'Our privacy policy sets out more details of this processing, including details of your data protection rights and including your right to object to certain processing which Skyworth carries out. More information about your rights, and how to exercise them, is set out in the "Your rights" section in Section V.\n'
            +'\n'
            + 'Ⅰ.What kinds of information do we collect?\n'
            +'\n'
            + '1.The personal data we collect\n'
            +'\n'
            + 'To provide our services for you, we may ask you to provide your personal data necessary to provide our services to you. According to the services you choose, we may collect one or more kinds of the following information:\n' 
            +'\n'
            + '● Information you provide to us\n'
            +'\n'
            + 'When you register AI Home or other services, contact us in relation to our services, we will collect information from you including your name, profile photo, nickname, phone number, email address, WeChat ID, QQ number and Weibo ID  and other information which we expressly ask you for and which you provide, for example responses sent to us when you participate in a questionnaire survey, as well as relevant information we collect when you participate in a user experience program or interact with us.\n'
            +'\n'
            + '● Device information\n'
            +'\n'
            + 'When you download or use Skyworth client software to use our services, Skyworth may read information about your mobile device, including, hardware model, your device\'s IMEI number and other unique device identifiers, MAC address, IP address, operating system version as well as device\'s settings for accessing our services; we may also read information about how you use Skyworth IoT appliances, including, device model, device operating status, use frequency and that the built-in camera in several devices may capture the usage of the device.\n'
            +'\n'
            + '● Log information\n'
            +'\n'
            + 'When you use Skyworth services or visit Skyworth websites, Skyworth will automatically receive and record the information in your browser and computer, including but not limited to the following:\n'
            +'\n'
            + '①Your IP address, browser type, languages used, visiting date and time, feature information of hardware and software and the webpage(s) you requested and any other data;\n'
            +'\n'
            + '②Log information of your IoT devices.\n'
            +'\n'
            + '● Location information (for specific services/functions only)\n'
            +'\n'
            + 'When you download or use Skyworth client software, visit webpage(s) as well as use certain Skyworth services, Skyworth may read various information relating to your location, such as device\'s GPS signal, nearby WiFi\'s access point, relevant information of cell-phone towers, country code, city code, mobile network code, cell ID, latitude and longitude and language settings, and these information may be sent to us when you use certain our services.\n'
            +'\n'
            + '● Usage information\n'
            +'\n'
            + 'When you use certain Skyworth services, you may also need to provide certain information to us, such as family size, food preferences and so on. In addition, you will be notified prior to connection to Skyworth client software and the Skyworth devices connected with Skyworth client software will upload the usage information.\n'
            +'\n'
            + '2.Information accessed by third-parties\n'
            +'\n'
            + 'Subject to your consent, we will facilitate collection of your personal data by third parties. Please refer to Section III(2) below. However, we do not receive any personal data about you from such third parties.\n'
            +'\n'
            + 'Necessity to provide data to us\n'
            +'\n'
            + 'You are not obligated to provide any personal information to us and it is up to you whether to provide your data to us or not. However, please note that without some of your information, we may not be able to perform some or all of our obligations to you under the applicable Terms of Service or provide you with all of our services. For example, if necessary, you can stop transmitting information to Skyworth\'s server or Skyworth IoT by individually removing the connection between each connected device and the Internet through the App, the device itself (for some devices only), or the "Restore Factory Settings" function. However, this may have the following results: ① you will not be able to use certain functions of the App; ② you can only control the appliance through the appliance itself, rather than the App. For another example, you can stop transmitting your location information to Skyworth\'s server by cancelling the App\'s location information access on your phone, or in some cases you can choose to store the data in local and forbid uploading. However, this will prevent you from using certain functions of the App. If you would like more details about this, please contact us following the instructions in the Contact Us below.\n'
            +'\n'
            + 'How do we use this information and what is the legal basis for this use?\n'
            +'\n'
            + 'We process your personal data for the following purposes:\n'
            +'\n'
            + '1)To fulfil a contract, or take steps linked to a contract: this is relevant where you purchase products or services from us. This includes:\n'
            +'\n'
            + 'a.taking payments;\n'
            +'\n'
            + 'b.communicating with you;\n' 
            +'\n'
            + 'c.providing customer services and arranging delivery or other provision of products or services.\n'
            +'\n'
            + '2)As required to conduct our business and pursue our legitimate interests, in particular, to:\n'
            +'\n'
            + 'a.Verify your identity;\n'
            +'\n'
            + 'b.Provide details of products and services you have enquired about or which you have requested, and communicate with you including respond to any comments or complaints you may send us;\n'
            +'\n'
            + 'c.Conduct big-data statistics for purposes of optimizing service performance ;\n'
            +'\n'
            + 'd.Share your contact information with our global branches for internal management and back office support purposes.\n'
            +'\n'
            + 'e.Maintain the integrity and security of our data technology systems for storage and processing of your personal data.\n'
            +'\n'
            + 'f.Create user/customer insights based on transactional behavior and/or demographic segments to drive targeted direct marketing and also carry out market research and surveys.\n'
            +'\n'
            + 'g.Monitor customer accounts to prevent, detect, investigate and/or report misrepresentation, information leakage, security incidents or crime, illegal activities, terrorism and fraud in accordance with applicable law.\n'
            +'\n'
            + 'h.Investigate any complaints received from you or from others, about our products, services or our website.\n'
            +'\n'
            + 'i.For compliance, regulatory and legal purposes including in connection with legal claims which concern [us] (including disclosure of such information in connection with legal process or litigation).\n'
            +'\n'
            + 'You can obtain further information on the legitimate interests balancing exercises which we have carried out by contacting us using the contact details provided below.\n'
            +'\n'
            + 'Where you give us consent:\n'
            +'\n'
            + 'a.We will send you direct marketing in relation to our relevant products and services, or other products and services provided by us.\n'
            +'\n'
            + 'b.We place cookies and use similar technologies in accordance with our cookies policy (see below paragraph on "Cookies and how we use them") and the information provided to you when those technologies are used.\n'
            +'\n'
            + 'c. We will share your personal data with authorized partners as set out in Section III(2) below.\n'
            +'\n'
            + 'd.On other occasions where we ask you for consent, we will use the data for the purpose which we explain at the time.\n'
            +'\n'
            + '4)For purposes which are required by law:\n'
            +'\n'
            + 'a.To ensure compliance with applicable laws and legal processes including, but not limited to, use in connection with legal claims, compliance, regulatory, tax, investigative purposes (including disclosure of such information in connection with legal process or litigation and to law enforcement agencies).\n'
            +'\n'
            + 'III.Who will we share this data with, where and when?\n'
            +'\n'
            + 'Your personal data will be kept in strict confidence and will only be shared with data recipients of the types listed below.\n'
            +'\n'
            + '1)Skyworth\'s affiliates\n'
            +'\n'
            + 'We are the data controller of your information, which means we have the right to decide how to process your personal information and for what purpose. In order to facilitate our provision of services to you on the basis of the unified account system on Skyworth\'s platform, or recommend information that may be of interest to you, or protect the personal and property safety of Skyworth or users or the public, your personal information may be shared among Skyworth\'s affiliates. We will only share personal information as necessary. A list of our affiliates and their contact details can be found here:Shenzhen Coocaa Network Technology Co., Ltd.\n'
            +'\n'
            + 'Email: bd@coocaa.com\n'
            +'\n'
            + 'Telephone: +86-0755-27357001\n'
            +'\n'
            + 'Nanjing Chuangwei Household Electronic Appliances Limited\n'
            +'\n'
            + 'Telephone: 025-69830088[Skyworth to confirm any relevant region/local code. Any email address?]\n'
            +'\n'
            + 'Shenzhen Skyworth Air Conditioning Technology Co., Ltd.\n'
            +'\n'
            + 'Telephone: 0755-22739273[Skyworth to confirm any relevant region/local code. Any email address?]\n'
            +'\n'
            +'\n'+ '2)Authorized partners'
            +'\n'+ 'We may share your information with trusted authorized partners who provide Internet and App-related services (including Google and Amazon). Subject to your consent, we may share your account information, device information, and location information with such authorized partners for the sole purpose of enabling and facilitating your access to our services through the platforms of such authorized partners who also provide their services to you. You may withdraw your consent at any time and your personal data will not be shared with such authorized partners.\n'
            +'\n'+ 'When you access the services of such authorized partners, they will also present you with their privacy notices in respect of their collection and use of your personal data and obtain your prior consent. We do not have access to any personal data that they may directly process about you. We will sign rigorous confidentiality agreements with our partners, and will, in appropriate manners, require them to follow our instructions, this Privacy Policy and any other relevant confidentiality and security measures in handling personal information. Once any of our partners is found to have violated any applicable agreement, we will take effective measures or even terminate our cooperation with it.\n'
            +'\n'+ '3)Other parties\n'
            +'\n'+ 'In addition to Section (2) above relating to authorized partners, we may also share your personal information with government authorities and/or law enforcement officials if required in order to comply with the mandatory requirements of laws and regulations, court orders or government authorities\' requests, to maintain social public interests, or for other purposes necessary to protect the personal and property safety and legal or other legitimate interests of our customers, Skyworth or Skyworth\'s employees in compliance with applicable laws. In the event that our business is sold or integrated with other business in the event of a merger, acquisition or bankruptcy liquidation, your information will be disclosed to our advisers and any prospective purchaser\'s adviser and will be passed to the new owners of the business.\n'
            +'\n'+ 'We may transfer your data to our affiliates, authorized partners (as set out above) and other parties (as set out above) in other countries/regions. Where information is transferred outside the UK or European Economic Area, and where this is to a recipient in a country that is not subject to an adequacy decision by the EU Commission, data is adequately protected by EU Commission approved standard contractual clauses, an appropriate Privacy Shield certification or a recipient\'s Binding Corporate Rules. A copy of the relevant mechanism can be provided for your review by contacting us via the contact information below.\n'
            +'\n'+ 'We may share anonymous information with third parties in aggregate form for commercial purposes; we may share information on the general usage trends of our services with them, such as the number of a group of specific customers who purchase certain products or engage in certain transactions.\n'
            +'\n'+ 'IV.How long do we retain your personal data?\n'
            +'\n'+ 'Where we process registration data, we do this for [as long as you are an active user of our services and for 6 months after this.]\n'
            +'\n'+ 'Where we process personal data for marketing purposes or with your consent, we will process the data until you ask us to stop and for a short period after this (to allow us to implement your requests). We also keep a record of the fact that you have asked us not to send you direct marketing or to process your data [indefinitely] so that we can respect your request in the future.\n'
            +'\n'+ 'Where we process personal data in connection with performing a contract, we keep the data for 6 months from your last interaction with us. Where we process personal data for site security purposes, we retain it for 6 months.\n'
            +'\n'+ 'Where cookies are placed on your device, these will expire after 6 months.\n'
            +'\n'+ 'Notwithstanding this, we may retain your personal information to assist with any government and judicial investigations, to bring or support legal claims or civil, criminal or administrative proceedings.\n' 
            +'\n'+ 'V.Your rights\n'
            +'\n'+ 'You have the right to ask us for a copy of your personal data; to correct, delete or restrict (stop any active) processing of your personal data; and to obtain the personal data you provide to us for a contract or with your consent in a structured, machine readable format, and to ask us to share (port) this data to another controller.\n'
            +'\n'+ 'In addition, you can object to the processing of your personal data in some circumstances (in particular, where we don’t have to process the data to meet a contractual or other legal requirement, or where we are using the data for direct marketing).\n'
            +'\n'+ 'These rights may be limited, for example if fulfilling your request would reveal personal data about another person, where they would infringe the rights of a third party (including our rights) or if you ask us to delete information which we are required by law to keep or have compelling legitimate interests in keeping. Relevant exemptions are included in applicable data protection laws. We will inform you of relevant exemptions we rely upon when responding to any request you make.\n'
            +'\n'+ 'To exercise any of these rights, or to obtain other information, such as a copy of a legitimate interests balancing test, you can get in touch with us using the details set out below. If you have unresolved concerns, you have the right to complain to an EU data protection authority where you live, work or where you believe a breach may have occurred.\n'
            +'\n'+ 'We usually provide free access, correction, update and deletion services, but reserve the right to charge a reasonable fee for your data access request.\n'
            +'\n'+ 'Account cancellation\n'
            +'\n'+ 'You may apply to cancel your Skyworth account by submitting a request. We will not set unreasonable conditions to prevent you from canceling your account, but if the cancelation of your account will affect your or others\' legitimate rights and interests, such as the goods you haven\'t received, the paid but unexpired services, etc., we will judge and inform you whether to support your cancellation request based on your usage of Skyworth services.\n'
            +'\n'+ 'The cancellation of account may affect your regular use of all relevant Apps and services. [Note to Skyworth: Would cancellation of account affect access to Skyworth data by third party authorized partners i.e. Google/Amazon? If so, we suggest stating the consequence here also.]We kindly remind you that your cancellation of account may bring you a lot of inconvenience in the subsequent use of Skyworth services. Additionally, after canceling Skyworth account, we will stop providing services for you, and your personal information will remain in a state that cannot be retrieved, accessed or anonymized unless otherwise provided by laws and regulations. If you log in through a third party account, you have to contact the third party to handle the cancellation of the account.\n'
            +'\n'+ 'If you are determined to abandon your account after careful consideration and meet all cancellation conditions, you may contact us through the contact information listed in Section X for relevant operations. Once the Skyworth account is canceled, it will not be recoverable. Please back up all relevant information and data of Skyworth account before the operation. Skyworth shall not be liable for any adverse effects on you due to your application for canceling your account.\n'
            +'\n'+ 'VI.Cookies and how we use them\n'
            +'\n'+ 'When you visit relevant websites of Skyworth or use services provided by Skyworth, we may identify your identity through small data file. These data files may be cookies, Flash Cookies, or other local storages provided by your browsers or associated Apps (collectively referred to as "Cookies").\n'
            +'\n'+ 'We use Cookies to analyse the flow of information, customize the services, content and advertising, measure promotional effectiveness and promote trust and safety. In particular, we use the following types of Cookies:'
            +'\n'+ 'Security Cookies: We use security cookies to authenticate users, prevent fraudulent use of login credentials and protect user data from unauthorised access by third parties.\n'
            +'\n'+ 'Preference Cookies: We use preference cookies to remember information that changes the way the site behaves or looks, such as preferred language. For example, Cookies remember your login credentials so that you do not have to enter them every time you access the service.\n'
            +'\n'+'Cookies help us and our authorized partners (set out above) understand which part of our services are most popular because cookies help us check which pages and features visitors access and how long they spend on these pages. With this information, we can effectively improve our services and provide you with a better experience. Cookies facilitate us and our authorized partners understanding which advertisements you have seen so that you do not receive the same advertisement every time you access the service. Cookies help us and our authorized partners provide relevant content and advertisements for you by collecting information about your use of our services and other websites and Apps.\n'
            +'\n'+ 'The types of information that we collect through Cookies include: profile photo, nickname, name, gender, birth date, company name, phone number, ID card, address, QQ number, signature and password. In addition, security preferences information include IP address, browser information (heading, JavaScript), timestamp and language.\n'
            +'\n'+ 'You may choose to accept or decline cookies. Please understand that some of our services can only be implemented through Cookies. If you use a Web browser to access the service, you may configure the browser to accept all cookies, reject all cookies, or notify you when sending cookies. Browsers are different from each other, so please check the browser\'s Help menu to learn how to change your Cookie preferences. Your device\'s operating system may also contain additional Cookie controls. If you choose to reject cookies, this may prevent you from taking full advantage of our websites and services.\n'
            +'\n'+ 'Webpages often contain some electronic images (called "single-pixel" GIF files or "Web beacon"). The use of Web beacon helps the websites calculate the users who browse the webpages or which cookies they access. We will collect information on browsing the webpages through Web beacon, such as the address of the page you visit, the address of the invoked page you have visited previously, the time you spent on the page, your browsing environment, and display settings.\n'
            +'\n'+ 'VII.Security\n'
            +'\n'+ 'We take appropriate technical measures to protect the security of personal information. We adopt certain technical means to protect your data and minimize the risks of misuse, unauthorized accessing, unauthorized disclosure and inaccessibility. Some of the security measures we use include data anonymization, data encryption, firewall and data access authorization control. We attach great importance to data security. Therefore, the security mechanism for data protection will be regularly checked and updated to provide effective protection against data abuse. All your accounts are protected by security measures, please keep your account and password information properly. Skyworth will take reasonable steps to ensure that your information is not lost, misused or altered through security measures such as backing up to other servers and encrypting user passwords. Although we adopt the aforementioned security measures, please understand that due to technical limitations and various malicious acts, a 100% safe Internet cannot be guaranteed.\n'
            +'\n'+ 'If you believe that the security of your data, especially your account and password information,  has been compromised, or if you want to know more about the measures we adopt to protect your data, please contact us as described in the "Contact Us" below.\n'
            +'\n'+ 'VIII.How do we process personal information of minors?\n'
            +'\n'+ 'Our products, website and services are mainly oriented towards adults. In the event of collecting the personal information of minors with the consent of their parents or statutory guardians, we may only use the personal information of minors collected legally as permitted by law, explicitly agreed by parents or guardians, or necessary for protecting minors.\n'
            +'\n'+ 'Should we find that we have collected the personal information of minors without the prior verifiable consent of their parents or guardians, we will try to delete relevant data as soon as possible. Where their parents or guardians have reasons to believe that minors have submitted personal information to Skyworth without their prior consent, please contact us to ensure the deletion of such personal information and ensure the unsubscription of any applicable Skyworth services by minors.\n'
            +'\n'+ 'IX.Updating of the Privacy Policy\n'
            +'\n'+ 'The Privacy Policy may be subject to changes. We will release any change to the Privacy Policy on this page, and where appropriate, we will push and send notices via App or otherwise make clear the specific content of changes\n'
            +'\n'+ 'Contact Us\n'
            +'\n'+ '1.Contact information\n'
            +'\n'+ 'If you have any questions, opinions or suggestions about this Privacy Policy, or if you want to exercise any rights, or if you have any requirements to discuss with us, please contact our personal information protection department in the following way:\n'
            +'\n'+ 'Email: vhome@skyworth.com\n'
            +'\n'+ 'Notes: Since there may be differences in legal and regulatory requirements among different countries and jurisdictions, if you find any privacy policy in the local language conflicts with this Privacy Policy when using our services in other jurisdictions, the local language version shall prevail. For any matters concerning this Privacy Policy or the use of your personal information, please contact us through the contact method listed on the Legal Notices page specific for your location.\n'
      }
    },
    methods: {
      back() {
        navigator.pop()
      }
    }
  }


</script>
