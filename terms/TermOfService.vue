<template>
  <div class = "body" @viewappear="onViewAppear" @viewdisappear="onViewDisappear" >
    <StatusBar ref="statusBar" :statusBarWhite = "false"></StatusBar>
    <web src="https://tv.doubimeizhi.com/webpages/aihome/terms-of-service.html" class="webView"></web>
     <div style="width: 100px;height: 100px;position:absolute; top:68px;left:48px;"  @click="back()">
         <div class="iconContent">
          <text style='font-family:iconfont1;font-size:48px;color:#3E3E3E;'>&#xe608;</text>
         </div>
      </div>
  </div>
</template>

<style scoped>
  .body {
    /* flex: 1; */
    width:750px;
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
  .webView{
    flex:1;
  }
</style>

<script>
  import StatusBar from '../../../components/StatusBar'
  const navigator = weex.requireModule('navigator')

  export default {
    components: {StatusBar},
    data () {
      return {
        content:'Swaiot User Terms of Service\n' +
        '\n' +
        'You are welcome to apply for the services provided by Skyworth Group Co., Ltd. (hereinafter referred to as "Skyworth"). Please read the following carefully. If you do not agree to any of the Terms of Service, please do not register or use Skyworth services. By entering the registration procedure and clicking “Register”, you have entered into an agreement with Skyworth and voluntarily accepted all the contents of the Terms of Service. Thereafter, you may not make any defense on the ground of not having read the contents of these Terms of Service. \n' +
        '\n' +
        '1. Confirmation and acceptance of the Terms of Service \n' +
        '\n' +
        'The Skyworth products in relation to Skyworth services and the intellectual property rights of related software are properties of Skyworth. The services provided by Skyworth must be strictly executed in accordance with its articles of association, terms of service and operating rules. The Terms of Service covers all products and services of Skyworth, and the users are subject to these Terms of Service when enjoying any individual services of Skyworth. When the user uses individual Skyworth services, his/her usage shall be deemed as consent to the terms of service for the individual services and the various announcements issued by Skyworth regarding the individual services.\n' +
        '\n' +
        '2. About Skyworth services\n' +
        '\n' +
        'Skyworth provides various services for users through the Internet using the Skyworth network and Internet TV. The user must: (1) provide devices such as personal computers, mobile phones or other connected devices; and (2) access the Internet as an individual and pay for fees associated with this service. In view of the importance of Skyworth product services, the user agrees to: (1) provide updated, detailed and accurate personal information; and (2) continuously update the registration information in a timely, detailed and accurate manner as required. Information of Skyworth’s registered members includes: the user mobile phone account number, password and all information provided when registering the materials. If the information provided to Skyworth by the user is inaccurate, untrue, or illegal, Skyworth reserves the right to terminate the use of Skyworth services by the user. The user agrees that the true and accurate registration information at Skyworth network provided by him/her is the only evidence serving as identifying the association of the user with his/her Skyworth member account and the identity of the user. When accessing to Skyworth services, the user agrees to accept various information services provided by Skyworth. Skyworth reminds the user that certain information he/she enters when registering for a member account or updating registration information may not be modified after the successful registration of the pass account or the supplementary submission. Please enter the registration information with caution. The user agrees that Skyworth system data shall prevail with respect to all information, data and records related to his/her Skyworth member account (including but not limited to login records, post-login behavior, and card information). \n' +
        '\n' +
        '3. Modification of the Terms of Service\n' +
        '\n' +
        'Skyworth is entitled to modify, if necessary, these Terms of Service and the terms of each individual service by reasonable means such as posting a notice on the website. When accessing these services, the user shall promptly check the modified content and voluntarily abide by the Terms of Service and the relevant terms of the individual service. By continuing to access the services under the Terms of Service, the user is deemed to have agreed to the modified contents; if the user does not agree to the modified contents, he/she is entitled to stop using the services under the Terms of Service.\n' +
        '\n' +
        '4、Change or suspension of service\n' +
        '\n' +
        'Skyworth reserves the right to change or discontinue the service at any time. The user agrees that Skyworth is entitled to exercise the above right without any responsibility for the user or any third party.\n' +
        '\n' +
        '5. User privacy policy\n' +
        '\n' +
        'The user acknowledges and agrees that in order to provide better services for the user, Skyworth will collect and integrate the user personal information provided that the user voluntarily chooses the service or provides the information. When the user accesses Skyworth services, the server automatically records certain information, including but not limited to URL, IP address, browser type, language of use, and date and time of access. To facilitate user’s login to access Skyworth services, Skyworth will use technologies such as cookies when necessary and send the collected information to the corresponding server. The user can choose to accept or reject cookies. If the user chooses to reject cookies, the user may not be able to log in or access cookie-dependent services or features. The information collected by Skyworth will become part of Skyworth regular business files and may be transferred to Skyworth successor or any designated party in case of transfer, merger, acquisition, and reorganization. Skyworth agrees to use the collected information in good faith and takes measures to ensure information confidentiality. It is a basic policy of Skyworth to respect the privacy of users. Therefore, Skyworth does not make public or disclose the user\'s registration information and non-public content stored in Skyworth\'s services, unless Skyworth believes in good faith that the disclosure of such information is necessary to: (1) comply with relevant laws and regulations, including providing the registration information of the user, the information posted by the user on Skyworth\'s website and the time of publication thereof, Internet address or domain name upon request from relevant state authorities; (2) maintain and safeguard Skyworth\'s intellectual property rights and other important rights; (3) use its bests efforts to maintain the privacy of the user and the public in case of emergency; and (4) other circumstances as per the relevant provisions or deemed necessary by Skyworth. \n' +
        '\n' +
        '6. The user\'s account, password and security\n' +
        '\n' +
        'Upon successfully registered as a user, the user will be provided with a password and an account number. If the user fails to take care of his/her account number and password, he/she shall be solely responsible for the damage to the user, Skyworth, or any third party, which is caused thereof. In addition, each user is solely responsible for all activities and incidents occurring under their account. The users are entitled to change his/her password at any time. The user agrees that he/she shall be obliged to immediately notify Skyworth of any illegal use of the user account or security breaches.\n' +
        '\n' +
        '7. Refusal to provide guarantee and disclaimer\n' +
        '\n' +
        'The user expressly agrees that the risk of using Skyworth services is borne by the user. Skyworth\'s member account and service are provided for the user on an “as is” basis, and Skyworth expressly disclaims any form of warranty, express or implied. Skyworth does not guarantee that the services will meet the requirements of the user, nor does it guarantee that the services will not be interrupted. Skyworth does not insure the timeliness, security, authenticity and error of the services. Skyworth disclaims any guarantees, including whether the information can be transmitted accurately, promptly and smoothly. The user understands and accepts that any information obtained by downloading or through Skyworth product services is at the user’s discretion and the user is responsible for system damage, data loss and any other risks arising thereof. Skyworth makes no guarantee for any goods purchase service, transaction process, and recruitment information obtained on the service network. The user will not receive verbal or written opinions or information from Skyworth, and Skyworth will not make express guarantee herein.\n' +
        '\n' +
        '8. Disclaimer\n' +
        '\n' +
        'Skyworth shall not be liable for any direct, indirect, incidental, special or consequential damages arising from improper use of product services, online purchase of goods or similar services online, transactions on the Internet, illegal use of the services or changes in information transmitted by the user. These damages may harm the image of Skyworth, and therefore Skyworth has already raised the possibility of such damages. Skyworth shall not be responsible for service interruption, loss of content of short messages sent by the user, messy codes, incorrect reception, failure of reception, or delayed reception caused by the faults, technical defects, coverage limitations, force majeure, computer viruses, hacker attacks, user location, or user shutdown of baseline telecommunication service provider or other issues beyond the technical capability of Skyworth involved in the service. \n' +
        '\n' +
        '9. Prohibition of commercialization of services\n' +
        '\n' +
        'The user undertakes that the user may not use Skyworth services for sales or other commercial purposes without the consent of Skyworth. If the user needs to use the services for commercial purposes, he/she shall notify Skyworth in writing and obtain the express authorization from Skyworth. \n' +
        '\n' +
        '10. User management\n' +
        '\n' +
        'The user is solely responsible for the contents he/she publishes. The use of the services by the user must comply with all local, national and international laws applicable to the services. The user undertakes that: (1) when the user posts information on Skyworth\'s website or use Skyworth\'s services, he/she must comply with relevant Chinese laws and regulations and shall not create, copy, publish or disseminate the information on Skyworth\'s website or using Skyworth\'s services that: (a) violates the basic principles under the Constitution; (b) endangers national security, divulges state secrets, subverts state power, or undermines national unity; (c) jeopardizes national honor and interests; (d) incites ethnic hatred and ethnic discrimination, and undermines ethnic unity; (e) breaches national religious policies, promotes cults and feudalistic superstition; (f) spreads rumors, disrupts social order, and undermines social stability; (g) spreads obscenity, pornography, gambling, violence, terror, or instigates crimes (h) insults or slanders others, infringes on the lawful rights and interests of others; (i) incites illegal assembly, association, procession, demonstration, gathering to disturb social order; (j) organizes illegal activities in the name of illegal civil organizations; or (k) contains other content prohibited by laws and administrative regulations; and (2) when posting information on Skyworth\'s website or using Skyworth services, the user must also comply with the laws and regulations of other relevant countries and regions and relevant provisions of international laws. The user is required to comply with laws and regulations when using Skyworth Weibo customer services. (3) the user may not use Skyworth services to engage in the following activities: (a) accessing computer information networks or using computer information network resources without permission; (b) deleting, modifying or adding computer information network functions without permission; (c) deleting, modifying or adding data and applications stored, processed or transmitted into the computer information network without permission; (d) intentionally producing and disseminating destructive programs such as computer viruses; and (e) other behaviors that endanger the security of computer information networks. (4) The user must not interfere with Skyworth services in any way. (5) The user must not abuse Skyworth services, including but not limited to: using the mailbox service provided by Skyworth to send spam, using Skyworth services to infringe on other people\'s intellectual property rights or other legitimate interests. (6) The use shall abide by all other requirements and procedures of Skyworth. The use shall be responsible for his/her own actions in the use of Skyworth services. The forms in which the user may assume legal liability include but are not limited to: compensating victims, and giving Skyworth the same amount of compensation after Skyworth first assumes the liability for administrative punishment or tort damage caused by the user\'s behavior. The user understands that if Skyworth finds that the information transmitted on its website evidently contains one of the contents listed in Article (1) above, Skyworth is obliged to terminate the transmission immediately, save the relevant records, report to relevant state authorities, and delete the address and directory containing the content or shutdown server according to Chinese laws. For the use of services on Skyworth forum by the user to enable users to access the Internet with information publishing conditions, the user shall be subject to relevant service rules, and the legal consequences and legal liabilities described in the previous paragraph shall also apply to users of forum services. If the user\'s behavior does not meet the above-mentioned terms of service, Skyworth will at its sole discretion to immediately cancel the user’s service account.\n' +
        '\n' +
        '11. Protection\n' +
        '\n' +
        'The user agrees to protect and maintain the interests of all members of Skyworth, and be responsible for paying the attorney\'s fees arising from the user\'s use beyond the scope of service, the compensation for damage arising from violation of the terms of service, and the expenses incurred by the use of the user\'s computer and account number by other persons. If the user or other persons infringe on the intellectual property rights and other rights of third parties in the process of using the user’s account, the user shall be liable therefor. If the use of Skyworth services by the user or other network service providers infringes on the civil rights of others, the user shall bear legal liabilities arising from such infringement. Where the user uses the services of Skyworth to conduct the infringement, the infringed has the right to notify Skyworth to take necessary measures such as deleting, blocking, and disconnecting the links. Upon receiving the notice, Skyworth shall assume the responsibility in accordance with the law where it fails to promptly take necessary measures in time due to its own fault. Where Skyworth is aware that use of its online services by the user infringes on the civil rights and interests of other persons but fails to take necessary measures within the scope stipulated herein, it shall assume liabilities in accordance with the law. \n' +
        '\n' +
        '12. Termination of service\n' +
        '\n' +
        'Either the user or Skyworth may terminate the service at any time based on actual conditions. Skyworth has the right to terminate the supply of one or more services to the user without prior notice; while the user has the right to terminate the reception of the service of Skyworth without prior notice. After the user service is terminated, the user\'s right to use the Skyworth service shall be immediately terminated. Thereafter, Skyworth no longer assumed any obligations to users. The user acknowledges and agrees that the change, suspension and termination of service are part of Skyworth\'s business decisions. The user may not request Skyworth to continue to provide services or assume any liability for any change, suspension or termination of services.\n' +
        '\n' +
        '13. Notification\n' +
        '\n' +
        'All notifications may be sent to the user by email, regular mail or by posting in a prominent location on the website. Skyworth will deliver messages to the user using one of the above methods to inform them of modification to the Terms of Service, changes in service, or other important things. Meanwhile, Skyworth reserves the right to push commercial advertisements to users who have applied for Skyworth member accounts.\n' +
        '\n' +
        '14. Participation in advertisement planning\n' +
        '\n' +
        'With the permission of Skyworth, users may add promotional materials to their published information or participate in advertising planning to showcase their products on Skyworth services. For any such promotional method, including shipment of goods, payments, services, business conditions, warranties, and descriptions related to advertising, occurs only between the respective user and the advertiser. Skyworth shall not assume any responsibility thereof, and shall not be obligated to assume any part of responsibility for the sale of such advertisements. \n' +
        + '\n'+
        '\n' +
        '15. Ownership of the contents\n' +
        '\n' +
        'The definition of content includes: text, software, sound, photos, videos, graphics; all the contents in the advertisement; all the contents in the email system; the business information provided to the user by the Skyworth virtual community service. All of these shall be properties of Skyworth and be protected by copyright, trademark, patent and other property ownership laws. Therefore, users may use these contents only after authorized by Skyworth and the advertisers, and may not copy, reproduce or create derivatives of the contents. \n' +
        '\n' +
        '16. Law\n' +
        '\n' +
        'This clause shall be subject to the laws of the People\'s Republic of China, excluding the application of all conflict of laws principles. In the event of any dispute, the user and Skyworth agree to refer the dispute to the people\'s court of the place where Skyworth is registered. \n' +
        '\n' +
        '17. Information storage and related intellectual property rights \n' +
        '\n' +
        'Skyworth will endeavor to maintain the security and convenience of all services on the pass, but will not be liable for the deletion or storage failure of the information contained in the services (including but not limited to the information posted by the user). In addition, Skyworth reserves the right to determine whether the user\'s actions are in compliance with these Terms of Service. If the user violates the provisions of these Terms of Service, Skyworth has the right to suspend or terminate the services of his/her Skyworth member account. For works contained in the services of Skyworth, whether created by the user or reprinted by the user with authorization of the copyright owner, the uploading thereof by the user means that the user or the copyright owner as an agent grants Skyworth a free, irrevocable and permanent right to the use of and income from the uploaded works, provided that the user or original copyright owner retains the copyright of the uploaded works. \n' +
        '\n' +
        '18. Special notes for teen users\n' +
        '\n' +
        'Young users must abide by the National Youth Network Civilization Convention: be good at learning online and refrain from browsing improper information; communicate in an honestly and friendly manner, and do not insult and defraud others; strengthen self-protection awareness, do not recklessly date friends online; maintain network security, and do not disrupt network order; pursue physical and mental health, and do not indulge in virtual space.\n' +
        '\n' +
        '19. Validity period of Skyworth member account \n' +
        '\n' +
        'The user shall be aware of the validity of the Skyworth member account and agree to log in and use the Skyworth member account from time to time to continue its validity. In general: (1) If there is no Skyworth prepaid amount with the user\'s Skyworth member account, and the account has not been logged in for 90 consecutive days, Skyworth has the right to cancel the Skyworth member account; (2) If there is Skyworth prepaid amount with the user\'s Skyworth member account, and the account has not been logged in for 90 consecutive days, Skyworth has the right to immediately terminate the mailbox service with the account and delete the contents of the mailbox; if the account has not been logged in for 540 consecutive days, the Skyworth prepaid amount with the account will expire at 24:00 on the 540th day from the last login of the account, and Skyworth has the right to delete the Skyworth member account. Once the account is deleted, all the data with the Skyworth member account and all the service information and data related to the account (including but not limited to the mailbox information, Skyworth prepaid amount, and information under game account) will be deleted at the same time and cannot be restored. The account name may be registered by a new user. Login to Skyworth member account refers to the completion of authentication using the Skyworth member account and password through means including but not limited to: (1) Web-based login; (2) login through client software such as mail, games and mobile applications; (3) through TV channel; Skyworth prepaid card refers to a one-time point-based prepaid card issued by Skyworth, which allows the user to consume all the paid products of Skyworth using points. Expiry of the Skyworth prepaid card: the Skyworth prepaid card amount with the Skyworth member account may not be used by the user, and the record with the Skyworth universal prepaid card is emptied and cannot be restored. Skyworth will not make any compensation or indemnity thereof.\n' +
        '\n' +
        '20. Statement of rights\n' +
        '\n' +
        'Skyworth\'s non-exercise or failure to exercise in a timely manner or in full of these terms or the rights it is entitled to under the laws shall not be deemed as a waiver of the rights, nor shall it prejudice on the exercise of the rights by Skyworth in the future. '
      }
    },
    methods: {
      back() {
        navigator.pop()
      }
    }
  }


</script>
