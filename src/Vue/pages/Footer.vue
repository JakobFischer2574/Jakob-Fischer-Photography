<template>
  <footer class="footer section-dark font-small text-center">
    <ul class="list-inline">
      <li class="list-inline-item">
        <a class="nav-item nav-link active" href="#">
          Home
        </a>
      </li>
      <li class="list-inline-item">
        <a class="nav-item nav-link" href="#about">About me</a>
      </li>
      <li class="list-inline-item">
        <a class="nav-item nav-link" href="#portfolio">Portfolio</a>
      </li>
      <li class="list-inline-item">
        <a class="nav-item nav-link" href="#contact">Contact</a>
      </li>
    </ul>

    <ul class="list-inline">
      <li
          v-for="(item, i) in social"
          :key="i"
          class="social-item list-inline-item"
      >
        <a :href="item.url" :alt="item.name">
          <i :class="item.faClass"> </i>
        </a>
      </li>
    </ul>

    <div class="copyright">
      <p>
        Copyright © {{ new Date().getFullYear() }}
        {{ text.main.name.first }} {{ text.main.name.last }}.
        {{ text.footer.copyrightText }}
      </p>
      <a @click="switchImprint" style="cursor: pointer;" href="#">
        <p>
          Impressum
        </p>
      </a>
      <div v-if="this.showImprint">
        <div class="legalInformation">
          <button class="backbtn" @click="switchImprint">x</button>
          <h1>Imprint:</h1>
          <p>Last updated: December 16, 2024</p>
          www.jaokobfischer-photography.com owned by Jakob Fischer
          <br>Frankenweg 40, 65760 Eschborn, Germany
          <br>E-Mail: contact@jakobfischer-photography.com
          <br>Pho.: +4915755852165
          <br>Owner: Jakob Fischer
        </div>
      </div>
      <a @click="switchPrivacyPolicy" style="cursor: pointer;" href="#">
        <p>
          Privacy Policy
        </p>
      </a>
      <div v-if="this.showPrivacyPolicy">
        <div class="legalInformation">
          <button class="backbtn" @click="switchPrivacyPolicy">x</button>
          <h1>Privacy Policy</h1>
          <p>Last updated: December 16, 2024</p>
          <h2>Table of Contents</h2>
          <ul class="index">
            <li><a class="index-link" href="#m3">Responsible Party</a></li>
            <li><a class="index-link" href="#mOverview">Overview of Data Processing</a></li>
            <li><a class="index-link" href="#m2427">Applicable Legal Bases</a></li>
            <li><a class="index-link" href="#m27">Security Measures</a></li>
            <li><a class="index-link" href="#m25">Transfer of Personal Data</a></li>
            <li><a class="index-link" href="#m24">International Data Transfers</a></li>
            <li><a class="index-link" href="#m12">General Information on Data Retention and Deletion</a></li>
            <li><a class="index-link" href="#m10">Rights of Data Subjects</a></li>
            <li><a class="index-link" href="#m182">Contact and Inquiry Management</a></li>
          </ul>

          <h2 id="m3">Responsible Party</h2>
          <p>Jakob Fischer<br>Frankenweg 40<br>Eschborn 65760<br></p>
          <p>Email address: contact@jakobfischer-photography.com</p>

          <h2 id="mOverview">Overview of Data Processing</h2>
          <p>The following overview summarizes the types of data processed and the purposes of their processing, while
            also referring to the affected individuals.</p>
          <h3>Types of Processed Data</h3>
          <ul>
            <li>Inventory data</li>
            <li>Contact data</li>
            <li>Content data</li>
            <li>Usage data</li>
            <li>Meta, communication, and procedural data</li>
          </ul>
          <h3>Categories of Affected Individuals</h3>
          <ul>
            <li>Communication partners</li>
          </ul>
          <h3>Purposes of Processing</h3>
          <ul>
            <li>Communication</li>
            <li>Organizational and administrative procedures</li>
            <li>Feedback</li>
            <li>Providing our online services and improving user experience</li>
          </ul>

          <h2 id="m2427">Applicable Legal Bases</h2>
          <p><strong>Legal bases under the GDPR: </strong>Below, you will find an overview of the GDPR legal bases on
            which we process personal data. Please note that in addition to the GDPR regulations, national data
            protection provisions applicable in your or our country of residence may also apply. If more specific legal
            bases apply in individual cases, we will inform you of these in the privacy policy.</p>
          <ul>
            <li>
              <strong>Performance of a contract and pre-contractual inquiries (Art. 6(1)(1)(b) GDPR)</strong> -
              Processing is necessary for the performance of a contract to which the data subject is a party or for the
              implementation of pre-contractual measures requested by the data subject.
            </li>
            <li>
              <strong>Legitimate interests (Art. 6(1)(1)(f) GDPR)</strong> - Processing is necessary to safeguard the
              legitimate interests of the controller or a third party, provided that the interests, rights, and freedoms
              of the data subject do not override these interests.
            </li>
          </ul>

          <p><strong>National data protection regulations in Germany: </strong>In addition to GDPR, national data
            protection regulations in Germany also apply. These include, in particular, the Federal Data Protection Act
            (BDSG), which provides specific regulations for the right of access, the right to deletion, the right to
            object, the processing of special categories of personal data, processing for other purposes, and
            disclosure, as well as automated decision-making in individual cases, including profiling. Additionally,
            state data protection laws in individual federal states may also apply.</p>
          <p><strong>Note on the applicability of GDPR and Swiss DSG: </strong>These privacy notices apply to both the
            Swiss DSG and the GDPR. For better comprehensibility and broader applicability, GDPR terminology is used.
            For example, instead of "processing" of "personal data" in the GDPR, the Swiss DSG uses "handling" of "data
            subjects," "overriding interests," and "special categories of personal data." The legal meaning of these
            terms under the Swiss DSG remains unaffected.</p>

          <h2 id="m27">Security Measures</h2>
          <p>We implement technical and organizational measures in accordance with legal requirements, considering the
            state of the art, implementation costs, and the nature, scope, circumstances, and purposes of processing, as
            well as the varying probabilities and severity of risks to individuals' rights and freedoms.</p>
          <p>These measures include safeguarding the confidentiality, integrity, and availability of data by controlling
            physical and electronic access, as well as the input, transfer, security, and separation of data.
            Additionally, we have procedures to exercise the rights of data subjects, delete data, and respond to
            threats to data. We also take into account the protection of personal data during the development or
            selection of hardware, software, and processes in line with the principles of data protection by design and
            by default.</p>
          <p>Online connections are secured using TLS/SSL encryption technology (HTTPS) to protect data transferred via
            our online services from unauthorized access. TLS/SSL ensures encrypted data transmission, meeting the
            highest security standards.</p>

          <h2 id="m25">Transfer of Personal Data</h2>
          <p>In the context of processing personal data, it may be transmitted to other entities, companies, legally
            independent organizations, or persons or disclosed to them. This includes service providers for IT tasks or
            other services and content providers integrated into the website. We comply with legal requirements and
            conclude agreements to ensure the protection of your data.</p>

          <h2 id="m24">International Data Transfers</h2>
          <p>For data processing in non-EU/EEA countries, we ensure compliance with GDPR regulations. Transfers occur
            based on adequacy decisions or other safeguards like standard contractual clauses, explicit consent, or
            legal obligations.</p>
          <p>More details about data transfers can be found on the EU Commission’s website.</p>

          <h2 id="m12">General Information on Data Retention and Deletion</h2>
          <p>We delete personal data according to legal provisions as soon as consent is revoked, or other legal bases
            cease to apply. Exceptions include cases where data must be retained due to legal obligations or specific
            interests.</p>
          <p>Data retention periods include:</p>
          <ul>
            <li>10 years: for bookkeeping and financial documents</li>
            <li>6 years: for other business correspondence</li>
            <li>3 years: for warranty or liability claims</li>
          </ul>

          <h2 id="m10">Rights of Data Subjects</h2>
          <p>Data subjects have the following rights under GDPR:</p>
          <ul>
            <li><strong>Right to Object:</strong> Object to data processing under specific conditions.</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time.</li>
            <li><strong>Right to Access:</strong> Request access to data and processing information.</li>
            <li><strong>Right to Rectification:</strong> Request correction or completion of data.</li>
            <li><strong>Right to Deletion and Restriction:</strong> Request data deletion or processing restriction.
            </li>
            <li><strong>Right to Data Portability:</strong> Request structured and machine-readable data format.</li>
            <li><strong>Right to Complain:</strong> Lodge a complaint with a supervisory authority.</li>
          </ul>

          <h2 id="m182">Contact and Inquiry Management</h2>
          <p>When contacting us (e.g., via mail, email, phone, or social media), we process the information provided to
            respond to your request.</p>
          <ul>
            <li><strong>Types of Data:</strong> Inventory data, contact details, content data, and metadata</li>
            <li><strong>Purposes:</strong> Communication, feedback, organizational procedures</li>
          </ul>
          <p>We ensure the secure and lawful processing of such data in compliance with legal retention periods.</p>
        </div>
      </div>


    </div>
    <div class="credit">
      <p>
        Designed with 👽 by
        <a
            id="username"
            href="https://www.github.com/darnocer"
            alt="Darian's Github"
        >darnocer</a
        >
      </p>
    </div>
  </footer>
</template>

<script>
import data from "../../data/data.json";
import {findLast} from "core-js/internals/array-iteration-from-last";

export default {
  name: "Footer",
  components: {},
  props: {},
  data() {
    return {
      showImprint: false,
      showPrivacyPolicy: false,
      text: data,
      social: data.contact.social,
    };
  },
  methods: {
    switchImprint() {
      this.showImprint = !this.showImprint;
    },
    switchPrivacyPolicy() {
      this.showPrivacyPolicy = !this.showPrivacyPolicy;
    },
    findLast
  }
};
</script>

<style lang="scss"></style>
