export default function CheckoutOverlay() {
  return (
    <>
      <div className="checkout-ov" id="checkoutOv" role="dialog" aria-modal="true" aria-label="Light your star">
        <div className="checkout-card">
          <button className="share-close co-close" id="checkoutClose" type="button" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
          <p className="co-eye">A little light, just for them</p>
          <h3 className="co-title" id="coTitle">Name your Guiding Star</h3>
          <div className="co-reserve"><span className="dot" aria-hidden="true"></span><p id="coReserveTxt"></p></div>
          <div className="co-summary" id="coSummary"></div>
          <p className="co-impact" id="coImpact"></p>
          <div className="preview-notice"><b>You&rsquo;re exploring a preview.</b><p>Donations open soon. For now, light a preview star, save your Story and send someone a little love. Your star travels in its share link; it isn&rsquo;t added to a permanent public registry.</p></div>
          <button className="btn btn-primary btn-lg co-pay-btn" type="button" id="coPay">Reveal my preview star<span className="arr">→</span></button>
          <p className="co-secure">No payment taken · no card details needed</p>
        </div>
      </div>
    </>
  );
}
