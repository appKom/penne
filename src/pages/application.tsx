import Title from '../components/appliance/Title';
import { HorizontalLine } from '../components/appliance/HorizontalLine';
import SubTitle from '../components/appliance/SubTitle';
import { Paragraph } from '../components/appliance/Paragraph';

import styles from '../components/soknad/SoknadPage.module.css';
import { applicationText } from '../content';

export default function SoknadPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div id={styles.soknadWrapper}>
        <Title title="Søke om støtte" />
        <HorizontalLine />
        <SubTitle title="Hvordan søke om støtte?" />
        <Paragraph text={applicationText} />
        <Paragraph text="Søknader sendes til fondet@online.ntnu.no" />
        <Paragraph text="Dette skal være med i søknaden:" />
        <ul className={styles.ul}>
          <li>Beskriv dere selv</li>
          <li>Hva midlene skal brukes til</li>
          <li>Hvordan midlene går onlinere til gode</li>
          <li>Aktivitetsplan</li>
          <li>Budsjett</li>
        </ul>
      </div>
    </div>
  );
}
