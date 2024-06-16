const HowToApply = () => {
  return (
    <div className="m-4 mx-40">
      <h1 className="my-6 text-2xl text-center">Hvordan søke om støtte?</h1>
      <p className="mb-auto">
        Alle Onlines medlemmer kan søke Onlines fond om penger. Søknaden skal
        være velbegrunnet og ha som hensikt å komme flest mulig medlemmer av
        Online til gode. For at Fondstyre skal kunne ta en god avgjørelse
        trenger vi en helhetlig forståelse av hvem dere er og hva dere gjør.
        Skriv gjerne litt for mye, enn litt for lite. Søknaden er kun gyldig
        dersom det søkes om mellom 10 000 kr og 100 000 kr.
        <br /><br />
        Dette skal være med i søknaden:
      </p>
      <ul className="my-4 ml-12 list-disc">
        <li>Beskriv av dere selv</li>
        <li>Hva midlene skal brukes til</li>
        <li>Hvordan midlene går onlinere til gode</li>
        <li>Aktivitetsplan</li>
        <li>Budsjett</li>
      </ul>
      <p>Søknader sendes til: <a href="mailto:fond@online.ntnu.no" className="underline">fond@online.ntnu.no</a></p>
    </div>
  );
};

export default HowToApply;
