import Link from 'next/link';

export default function Selected() {
  return (
    <div className="w-full h-full m-0 p-0 bg-foreground px-12 pt-8 pb-12">
      <h2 className="text-white">Selected Work</h2>
      <div className="grid lg:grid-cols-2 gap-12 w-full selected mt-8 lg:px-12">
        <Link href="/work/white-lies" className="item">
          <img src="/images/featured/white-lies-featured.jpg" />
          <div className="details">
            <h3>White Lies</h3>
            <h4>
              Composer for 3 seasons of NPR's Pulitzer Prize finalist podcast
              series
            </h4>
            <p>
              An investigative narrative podcast series engaging with race,
              historical memory, and injustice in the American South.
            </p>
          </div>
        </Link>
        <Link href="/work/a-call-from-selma" className="item">
          <img src="/images/featured/selma-featured.webp" />
          <div className="details">
            <h3>A Call From Selma</h3>
            <h4>Composer for The New York Times Op-Doc</h4>
            <p>
              A short documentary on the overlooked racial politics behind the
              passage of the 1965 Voting Rights Act.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
