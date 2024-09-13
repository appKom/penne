import Member from '../components/about_us/Members';
import styles from '../components/about_us/Members.module.css';
import Accordion from '../components/about_us/Accordion';

export default function OmOssPage() {
  return (
    <div>
      <div id={styles.titel2}>
        <div className={styles.omFondet}>
          <div className={styles.omOssWrapper}>
            <h1> Om oss </h1>
            <hr className={styles.horizontalline}></hr>
            <p>
              Onlinefondet er en engasjert og livlig studentorganisasjon ved
              NTNU, dedikert til å fremme studentenes interesser og berike deres
              akademiske og sosiale opplevelser. Gjennom vårt fond, ledet av et
              dedikert fondstyre, gir vi økonomisk støtte til initiativer som
              sikrer at medlemmenes behov og interesser blir ivaretatt. Fra å
              finansiere nytt musikkutstyr for vårt linjeforeningsband, til å
              støtte surfeturer og sosiale arrangementer, streber vi etter å gi
              tilbake til vår studentkommunitet. Med en rik historie og et
              engasjert medlemskap, er vi stolte av vår evne til å kombinere det
              faglige med det sosiale, og skape varige minner for alle Onlinere.
            </p>
          </div>
        </div>

        <div className={styles.styremedlemmer}>
          <Member
            path={'Fondmedlemmer/Hilmir.jpg'}
            name={'Hilmir Straumland (Leder)'}
          />
          <Member path={'Fondmedlemmer/Johanna.jpg'} name={'Johanna Wilmers'} />
          <Member
            path={'Fondmedlemmer/Magnus.jpg'}
            name={'Magnus Byrkjeland'}
          />
          <Member path={'Fondmedlemmer/noimage.jpg'} name={'Maiken Lie'} />
          <Member
            path={'Fondmedlemmer/William.jpg'}
            name={'William Andersson'}
          />
          <Member path={'Fondmedlemmer/Thea.jpg'} name={'Thea Karin Fladby'} />
          <Member
            path={'Fondmedlemmer/noimage.jpg'}
            name={'Johanne Tronstad'}
          />
        </div>
        <div className={styles.tidligereMedlemmer}>
          <h1> Tidligere medlemmer</h1>
          <div className={styles.tidligereMedlemmerWrapper}>
            <Accordion
              title="2022"
              content={[
                'Henrik Horten Hegli',
                'Anh-Kha Vo Nguyen',
                'Hilmir Straumland',
                'Henrik Giil Liisberg (Leder)',
                'William Andersson',
                'Michael Johansen',
                'Johanne Tronstad',
              ]}
            />

            <Accordion
              title="2021"
              content={[
                'Milla Weium',
                'Jonathan Brooks (Leder)',
                'Jan Arild Brobak',
                'Henrik Giil Liisberg',
                'Kaja Sofie Lundgaard',
                'Michael Johansen',
                'Marius Enerly',
              ]}
            />

            <Accordion
              title="2020"
              content={[
                'Christoffer Stensrud',
                'Nicolai Andre Dalaaker (Leder)',
                'Jan Arild Brobak',
                'Christian Nyvoll',
                'Kaja Sofie Lundgaard',
                'Christoffer Skar Lofsberg',
                'Marius Enerly',
              ]}
            />

            <Accordion
              title="2019"
              content={[
                'Kaja Sofie Lundgaard',
                'Nicolai Andre Dalaaker',
                'Sigurd Oxaas Wie (Leder)',
                'Christian Nyvoll',
                'Martin Bjerke',
                'Christoffer Skar Lofsberg',
                'Sverre Bjørke',
              ]}
            />

            <Accordion
              title="2018"
              content={[
                'Christian Nyvoll',
                'Tord Standnes',
                'Sigurd Oxaas Wie',
                'Sondre Widmark',
                'Taran Ruge',
                'Henning Wold',
                'Sverre Bjørke',
              ]}
            />

            <Accordion
              title="2017"
              content={[
                'Christoffer Skar Lofsberg',
                'Tord Standnes',
                'Sondre Widmark',
                'Henning Wold',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
