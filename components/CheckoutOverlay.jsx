export default function CheckoutOverlay() {
  return (
    <>
      <div className="checkout-ov" id="checkoutOv" role="dialog" aria-modal="true" aria-label="Light your star">
        <div className="checkout-card">
          <button className="share-close co-close" id="checkoutClose" type="button" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
          <p className="co-eye">Almost there</p>
          <h3 className="co-title" id="coTitle">Name your Guiding Star</h3>
          <div className="co-reserve"><span className="dot" aria-hidden="true"></span><p id="coReserveTxt"></p></div>
          <div className="co-summary" id="coSummary"></div>
          <p className="co-impact" id="coImpact"></p>
          <div className="co-pay">
            <label className="co-fld"><span>Card number</span><input id="coCard" inputMode="numeric" placeholder="4242 4242 4242 4242" /></label>
            <div className="co-row">
              <label className="co-fld"><span>Expiry</span><input id="coExp" placeholder="MM / YY" /></label>
              <label className="co-fld"><span>CVC</span><input id="coCvc" inputMode="numeric" placeholder="123" /></label>
            </div>
            <label className="co-fld"><span>Email for your receipt</span><input id="coEmail" type="email" placeholder="you@email.com" /></label>
          </div>
          <button className="btn btn-primary btn-lg co-pay-btn" type="button" id="coPay">Pay <span id="coAmt">&euro;15</span> &amp; light it<span className="arr">→</span></button>
          <p className="co-secure"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 0 1 8 0v3"></path></svg>Demo checkout · no real charge · every cent would go to Ballymun</p>
        </div>
      </div>
    </>
  );
}
