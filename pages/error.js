import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux'
import { getContractFreelancer, getFreelancer } from '../reduxToolkit/freelancerSlice';
import { acceptAndSign } from '../reduxToolkit/clientSlice';

import Header from '../components/Header'
import jobContractIcon from '../assets/images/jobContractIcon.png'
import priceRectangle from '../assets/images/priceRectangle.png'
import calendarIcon from '../assets/images/calendarIcon.png'
import clockIcon from '../assets/images/clockIcon.png'
import locationIcon from '../assets/images/locationIcon.png'
import { freelancerDetails } from '../assets/data/freelancerDetails'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import checkbox from '../assets/images/checkbox.png'
import PrimaryButton from '../components/Buttons/PrimaryButton'
import btnBackground from '../assets/images/btnBackground.png'
import { acceptContractFreelancer } from '../reduxToolkit/freelancerSlice';
import { createContract, getJob } from '../reduxToolkit/jobSlice';

const ContractPageFreelancer = ({navigation, route}) => {
  const [isChecked, setChecked] = useState(false);
  const {freelancer} = useSelector(store => store.freelancer)
  const {user} = useSelector(store => store.user)
  const { id, title, price, roles, languages, location, shift } = freelancerDetails
  const { roleId, description, name, date } = roles[0]
  const dispatch = useDispatch()
  const [client, setClient] = useState({})
  const [clientId, setClientId] = useState({})

  const [job, setJob] = useState({})
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    dispatch(getContractFreelancer(route.params.action))
    .unwrap()
    .then(res => {
      setClientId(res.contract.clientId)
      setJob(res.contract.job)
      setClient(res.contract.client.companyName)
      setLoading(false)
    })
    .catch(err => {
      console.log("erorr", err)
      setLoading(false)
    })
  }, [])
  const navigateAccept = () => {
    if(!isChecked){
      return alert("Please read and accept the terms and conditions")
    }
    dispatch(acceptContractFreelancer(route.params.action) ) 
    .unwrap()
    .then((response) => {
      return navigation.navigate('acceptedClient', {role: "freelancer", action: clientId})
    })
    .catch((error) => {
      console.log("error", error)
      if(error ===  "time conflict"){
        alert("Cannot sign, you already have a job at this time.")
        return navigation.navigate('seeker_dash')
      }
      alert("Cannot sign")
      return navigation.navigate('seeker_dash')

    })

  }

  return loading? <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size={"large"} />
  </View>
  :(
    <ScrollView style={styles.wrapper}>
      <Header title='Job Contract' icon={jobContractIcon} goBack={navigation.goBack} />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleHeader}>
          <Text style={styles.text}>
            Please read carefully the below contract and accept the terms and conditions. Your contract will be legally registered once the freelancer signs it.
          </Text>
        </View>
        <View style={styles.header}>
          <View style={styles.subHeader}>
            <ImageBackground
              source={priceRectangle}
              style={styles.priceBg}
              resizeMode='contain'
            >
              <View style={styles.priceAndCurrency}>
                <Text style={styles.price}>{job.budget} </Text>
                <Text style={styles.currency}>AED</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
        <LinearGradient
          colors={[
            'rgba(202, 218, 221, 0.1)',
            'rgba(202, 218, 221, 0)',
            'rgba(202, 218, 221, 0.2)',
            'rgba(202, 218, 221, 0.2)',
            'rgba(202, 218, 221, 0.2)',
            'rgba(202, 218, 221, 0.1)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linear}
        >
          <View style={[styles.container2, styles.shadow]}>
            <View style={styles.info}>
              <MaskedView
                maskElement={
                  <Text
                    style={[styles.title, { backgroundColor: 'transparent' }]}
                  >
                    {job.category}
                  </Text>
                }
              >
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['rgba(49, 190, 187, 1)', 'rgba(101, 91, 218, 1)']}
                >
                  <Text style={[styles.title, { opacity: 0 }]}>{job.category}</Text>
                </LinearGradient>
              </MaskedView>
              <Text style={styles.description}>{job.description}</Text>
            </View>
            <LinearGradient
              colors={[
                'rgba(202, 218, 221, 0.4)',
                'rgba(202, 218, 221, 0)',
                'rgba(202, 218, 221, 0.4)',
              ]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.footer}>
                <View style={styles.footerInfo}>
                  <Image source={calendarIcon} style={styles.icon}></Image>
                  <Text style={styles.text2}> {job.startDate && job.startDate.slice(0,10)}</Text>
                </View>
                <View style={styles.footerInfo}>
                  <Image source={clockIcon} style={styles.icon}></Image>
                  <Text style={styles.text2}> {job.shift === 'night' ? "Night Shift" : "Day Shift"}</Text>
                </View>
                <View style={styles.footerInfo}>
                  <Image source={locationIcon} style={styles.icon}></Image>
                  <Text style={styles.text2}>{job.location && job.location}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
        <View style={styles.contractFees}>
          <View style={styles.feeAndPrice}>
            <Text style={styles.fee}>Freelancer Fees</Text>
            <Text style={styles.price}>{job.budget}</Text>
          </View>
        </View>
        <View style={styles.parties}>
          <View style={styles.partyAndName}>
            <MaskedView
              maskElement={
                <Text
                  style={[styles.party, { backgroundColor: 'transparent' }]}
                >
                  First Party
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#31BEBB', '#655BDA']}
              >
                <Text style={[styles.party, { opacity: 0 }]}>First Party</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.shadowTitle}>{client}</Text>
          </View>
          <View style={styles.partyAndName}>
            <MaskedView
              maskElement={
                <Text
                  style={[styles.party, { backgroundColor: 'transparent' }]}
                >
                  Second Party
                </Text>
              }
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#31BEBB', '#655BDA']}
              >
                <Text style={[styles.party, { opacity: 0 }]}>Second Party</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.companyName}>{user.name} {user.lastName}</Text>
          </View>
          <Text style={styles.revealText}>
            Will be revealed after signing the contract
          </Text>
          <Text style={styles.jobDescription}>
          This service agreement (hereinafter the “Agreement”) is made on {date} by and
          between:
          (1) [Company] in UAE, Dubai with an office address Dubai Media City , DMC 2 ,
          2nd Floor , office # ED78 Dubai , UAE. (hereinafter “[Company Name]”)
          on the one part; and
          (2) [Freelancer] with Nationality Passport Number   (hereinafter the “[Job
          Position]” ) ,with physical home address in ( ……………. ) on the other part.

          [Company] and the project manger may hereinafter be referred to individually as a
          “Party” and collectively as the “Parties”.

          WHEREAS
          [Company] wishes to engage the [Job Position] and the [Job Position] wishes
          to provide project management services to [Company Name] on the terms
          and conditions set out in this Agreement; and
          The [Job Position] has the skills, qualifications and expertise by reason of his
          experience, background and contacts to provide project management services
          in accordance with the terms of this Agreement.

          NOW IT IS AGREED as follows : In this Agreement, the following words shall have
          the following meanings:
           ‘Commencement Date’ means December 4, 2019
           ‘End User’ means [Company Name] based in [City]
          APPOINTMENT : [Company Name] appoints the [Job Position] to provide
          Project Management Services and the [Job Position] accepts the appointment subject
          to the provisions of this Agreement.
          SCOPE OF SERVICES :The [Job Position]shall provide [Company Name]
          with project management Services for the Shifting [Company Name]operation
          located in cairo media city . the project management scope will include and not
          limited to project management of the complete scope of Shifting [Company Name]

          3 | Page
          from the existing building to the new building ( under construction ) located also in
          Cairo media city . The service will also include the support and follow up of the
          technical tender process , construction phases progress , set design and execution
          progress , technical system integration progress , smooth operation transition from
          the existing [Company Name] building to the new building , training schedule
          progress and a smooth and risk free relaunch of the channel from the new building .
           the [Job Position] shall report and log on daily basis all activities and set the
          necessary starting and ending date to make sure of the accurate project
          progress record and related tasks delivery
           the [Job Position] will insure to follow and track every task in the project
          plans provided from all project stakeholders and insure that all project tasks
          are in sync targeting to deliver on time .
           [Job Position] will insure to rase the flag and report [Company Name] on
          any task has an effect or cause a delay to the other project tasks .
           The [Job Position] Services performed by [Job Position] will be on a best
          efforts basis which is consistent with that necessary standard of care and skill
          ordinarily used by members of the project management profession practicing
          under similar conditions at the same time and in the same locality.
          TERM:The service agreement shall commence on the Commencement Date and
          shall continue for a fixed period of 7 months (the “Term”) and may be renewed upon
          the written mutual agreement of both Parties.
          [Job Position]’S FEE AND BENEFITS :In consideration of performing the Services
          [Company Name] shall pay the [Job Position] a gross monthly fee of [Total
          Sum] (the “Fee”) including all expenses and excluding accommodation and
          transportation in between home and office , payable to his account at Emirates NBD
          – Dubai – UAE. The [Job Position] shall be solely responsible for paying his own
          taxes and any personal income taxation due for his Services under this Agreement.
          NOTICES: Any notice to be given under this Agreement shall be in writing and shall
          be sent by eather a first class mail or facsimile or e-mail to the address of the relevant
          Party set out at the head of this Agreement, or to the relevant email address set out
          below, or such other address or facsimile number as that Party may from time to time
          notify to the other Party in accordance with this clause. The relevant contact
          information for the Parties is as follows

          4 | Page

          Notices to [Company Name]:
          [Company Name]
          [Company email]
          Attention: [Authorized Signatory]
          Notices to the [Job Position]:
          [Freelancer Name]
          [Freelancer Email]
          Attention: [Freelancer Name]
          COMMUNICATION AND REPRESENTATION: [Job Position] will be working under
          [Company Name] and therefore all email exchange for the [Job Position] during the
          project duration will be using [Company Name] corporate email address . [Job
          Position] will insure not to approve or reject any request outside the scope without
          referring to [Company Name] for further communication with the end user.
          FURTHER ENGAGEMENT: The [Job Position] understand that any direct or indirect request
          of business engagement as a result or outcome of this agreement will be through
          [Company Name]. therefore, [Job Position] and [Job Position]
          employees/outsourced resources will not under any circumstances work or enter in any
          business engagement as part time of full time with the end user during the term of this
          agreement and within a period of two years after the termination of this agreement.
          DISPUTE: In the event of any dispute arising out of or in relation to this Agreement, the
          parties will in good faith attempt to resolve such dispute. In the event of failure by the
          parties to resolve any dispute in accordance, both parties agree to submit any such dispute
          to binding arbitration in accordance with the rules of the Dubai International Arbitration
          Centre (DIAC). The place of such arbitration shall be Dubai, the language of such
          arbitration shall be English and the governing law shall be UAE.
          TERMINATION: [Company Name] has the right to terminate this agreement at any time
          in case The [Job Position] fail to perform part or the complete scope of work in this
          agreement with one month notice .
          ASSIGNMENT: The [Job Position] shall not directly or indirectly assign or transfer this
          Agreement or any of the rights or obligations hereunder in whole or part to any third party
          without the prior written approval of [Company Name].
          INDEMNITY: The defaulting party agrees to indemnify and keep indemnified non-defaulting
          party from and against any and all loss, damage or liability (whether criminal or civil)
          suffered and legal fees and costs incurred by the non-defaulting party as a result of any act
          of gross negligence or willful default by the defaulting party including but not limited to

          5 | Page
          unauthorized use or disclosure of the confidential information of the non-defaulting party.

          ENTIRE AGREEMENT: This Agreement contains the entire understanding between
          [Company Name] and the [Job Position]. This Agreement supersedes all prior and
          contemporaneous agreements, proposals and communications between the parties. This
          Agreement may be modified only by writings duly signed by authorized representatives of
          both parties.
          IN WITNESS WHEREOF, the Parties have hereunto set their hands as of the Effective Date set
          forth above.
          This Agreement is executed in 2 (two) original copies in the English language, each
          Party shall keep one copy, and each copy shall constitute the same meaning and will
          be equally and legally binding on both Parties.

          IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the
          date first written above.
          </Text>
          <View style={styles.checkboxAndConfirm}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={"#31BEBB"}
            />
            <Text style={styles.confirm}>
              I hereby confirm all the mentioned in this contract
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <ImageBackground
        source={btnBackground}
        style={styles.btnBg}
        resizeMode="stretch"
      >
        <TouchableOpacity style={styles.btn} onPress={() => navigateAccept()}>
          <PrimaryButton title='Accept and Sign' />
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    width: "90%",
    alignSelf: "center"
  },
  container2:{
  },
  info: {
    padding: 20,
    paddingLeft: 35,
  },
  titleHeader: {
    marginTop: 50,
    alignItems: "center"
  },
  text: {
    fontSize: 13,
    fontFamily: 'PoppinsR',
    textAlign: "center",
    width: "80%",
    color: 'rgba(0, 0, 0, .6)',
  },
  text2: {
    fontSize: 10,
    left: 5,
    fontFamily: 'PoppinsR',
    textAlign: "center",
    color: 'rgba(0, 0, 0, .6)',
  },
  header: {
    zIndex: 1,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -45,
  },
  priceBg: {
    width: 110,
    height: 90,
    left: 10,
    justifyContent: 'center',
  },
  price: {
    fontSize: 15,
    left: 10,
    color: 'rgba(16, 125, 197, 1)',
    fontFamily: 'PoppinsS',
  },
  priceAndCurrency: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '100%',
  },
  currency: {
    fontSize: 10,
    fontFamily: 'PoppinsR',
    marginLeft: 10,
    marginTop: 3,
    color: '#107DC5',
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'PoppinsS',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'rgba(16, 125, 197, 1)',
    borderTopWidth: 0.4,
    padding: 20,
    width: '100%',
  },

  footerInfo: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingTop: 7,
  },
  description: {
    color: 'rgba(10, 8, 75, .6)',
    fontFamily: 'PoppinsR',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feeAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  fee: {
    fontSize: 12,
    fontFamily: 'PoppinsR',
    color: '#107DC5',
  },
  contractFees: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  parties: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  party: {
    fontSize: 16,
    fontFamily: 'PoppinsS',
    width: 150,
  },
  partyAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  companyName: {
    color: 'rgba(0,0,0,.6)',
    fontFamily: 'PoppinsR',
    fontSize: 13,
  },
  revealText: {
    marginTop: -10,
    fontSize: 10,
    color: '#107DC5',
    fontFamily: 'PoppinsL',
  },
  jobDescription: {
    marginTop: 20,
    fontSize: 12,
    width: "95%",
    fontFamily: 'PoppinsR',
    color: 'rgba(10, 8, 75, .6)',
  },
  checkboxAndConfirm: {
    paddingHorizontal: 4,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirm: {
    marginLeft: 5,
    color: '#212121',
    fontFamily: 'PoppinsR',
    fontSize: 12,
    width: '100%',
  },
  btnBg: {
    height: '100%',
    marginTop: 20,
  },
  btn: {
    alignItems: 'center',

    width: '100%',
    alignSelf: 'center',
    padding: 40,
  },
  linear:{
    width: "100%",
    borderRadius: 20
  },
  checkbox:{
  },
  shadowTitle: {
    marginBottom: 10,
    fontFamily: 'PoppinsB',
    fontSize: 13,
    color: "rgba(202, 218, 221, 0.2)",
    width: '100%',
    shadowColor: "rgba(101, 91, 218, 1)",
    shadowOffset: {
      width: 5,
      height: -4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    textTransform: "capitalize",
    fontWeight: "bold",
    elevation: 10,
    textShadowColor: "rgba(101, 91, 218, 9)",
    textShadowOffset: {
      width: -4,
      height: 4,
    },
    textShadowRadius: 7,
    textTransform: "capitalize",
  }
})

export default ContractPageFreelancer
