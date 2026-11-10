export default function Gallery() {
  return (
    <>
      <section className="gallery" id="gallery" data-screen-label="Community" aria-label="Moments from the community">
        <div className="container">
          <div className="g-head reveal">
            <p className="section-label">Our community</p>
            <h2>Moments from Ballymun.</h2>
          </div>
          <div className="grid reveal">
            <figure className="big"><img loading="lazy" decoding="async" width={1200} height={1600} src="/assets/community-1.webp" alt="Two children smiling over their colouring at Kids Club" style={{objectPosition:'50% 32%'}} /></figure>
            <figure><img loading="lazy" decoding="async" width={258} height={306} src="/assets/gallery-mentor.webp" alt="Mentors and young members celebrating a certificate" style={{objectPosition:'50% 20%'}} /></figure>
            <figure><img loading="lazy" decoding="async" width={1536} height={2048} src="/assets/community-2.webp" alt="Two friends at the sunrise walk" style={{objectPosition:'50% 24%'}} /></figure>
            <figure className="wide"><img loading="lazy" decoding="async" width={885} height={201} src="/assets/gallery-walk.webp" alt="The community gathered at sunrise in the park" style={{objectPosition:'50% 40%'}} /></figure>
          </div>
        </div>
      </section>
    </>
  );
}
