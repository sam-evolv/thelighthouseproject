export default function ArriveOverlay() {
  return (
    <>
      <div className="arrive-ov" id="arriveOv" role="dialog" aria-modal="true" aria-label="A star has been named for you">
        <span className="av-preview-tag" id="avPreviewTag" hidden>Preview · what they will see</span>
        <div className="arrive-inner">
          <span className="av-star" aria-hidden="true"></span>
          <p className="av-eye" id="avEye">A star has been named</p>
          <p className="av-name" id="avName">Hello.</p>
          <p className="av-line" id="avLine"></p>
          <button className="btn btn-primary btn-lg av-go" type="button" id="avGo"><span className="flame"></span><span id="avGoTxt">Show me my star</span><span className="arr">→</span></button>
        </div>
      </div>
    </>
  );
}
