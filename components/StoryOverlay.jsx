export default function StoryOverlay() {
  return (
    <div className="story-ov" id="storyOv" role="dialog" aria-modal="true" aria-label="Create your Instagram Story">
      <button className="share-close" id="storyClose" type="button" aria-label="Close Instagram Story"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
      <div className="story-preview"><canvas id="storyCanvas" width="1080" height="1920" aria-label="Your personalised star Story" /><span className="story-preview-glint" aria-hidden="true" /></div>
      <div className="story-details">
        <p className="section-label">Pass the light on</p>
        <h3>Some things are<br /><em>too lovely to keep.</em></h3>
        <p>A little love, made for their screen. Save your Story, tag someone who lights up your life, and let them find their star.</p>
        <ol><li>Save the Story image to your phone.</li><li>Add it to your Instagram Story.</li><li>Use the Link sticker to add their star link.</li></ol>
        <button className="btn btn-primary btn-lg" type="button" id="storySave">Save Story image <span aria-hidden="true">↓</span></button>
        <button className="story-secondary" type="button" id="storyShare" hidden>Share image with friends ↗</button>
        <button className="story-secondary" type="button" id="storyCopy">Copy star link for your sticker ↗</button>
        <p className="story-note" id="storyStatus" role="status">1080 × 1920 PNG · ready for Instagram Stories</p>
      </div>
    </div>
  );
}
