import { useState, useRef, useEffect, useCallback } from "react";
import { Download, ArrowLeft, Image, Type, Smile, Sliders, Plus, CheckCircle } from "lucide-react";

// ─── Google Fonts ──────────────────────────────────────────────────────────────
const FontLoader = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </>
);

// ─── Shared Styles ─────────────────────────────────────────────────────────────
const labelStyle = {
  fontFamily: "'DM Sans', sans-serif",
  color: "rgba(255,255,255,0.5)",
  fontSize: "0.72rem",
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  marginBottom: "2px",
};

const inputStyle = {
  width: "100%",
  padding: "0.65rem 0.85rem",
  borderRadius: "10px",
  border: "1.5px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
};

const rangeStyle = {
  width: "100%",
  accentColor: "#25D366",
  cursor: "pointer",
};

const exportBtnStyle = (bg) => ({
  padding: "0.45rem 0.75rem",
  borderRadius: "8px",
  border: "none",
  background: bg,
  color: "#fff",
  fontFamily: "'Syne', sans-serif",
  fontWeight: 700,
  fontSize: "0.7rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  letterSpacing: "0.04em",
});

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, visible }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "1.5rem",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : "1rem"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        background: "#25D366",
        color: "#fff",
        padding: "0.65rem 1.4rem",
        borderRadius: "999px",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 600,
        fontSize: "0.85rem",
        letterSpacing: "0.03em",
        boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      <CheckCircle size={15} /> {message}
    </div>
  );
}

// ─── Checkerboard ──────────────────────────────────────────────────────────────
function Checkerboard({ size = 220 }) {
  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", inset: 0, borderRadius: "1rem", opacity: 0.35 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="checker" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#ccc" />
          <rect x="10" y="10" width="10" height="10" fill="#ccc" />
          <rect x="10" y="0" width="10" height="10" fill="#fff" />
          <rect x="0" y="10" width="10" height="10" fill="#fff" />
        </pattern>
      </defs>
      <rect width={size} height={size} fill="url(#checker)" rx="16" />
    </svg>
  );
}

// ─── Splash Screen ─────────────────────────────────────────────────────────────
function SplashScreen({ onStart }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #0d1117 0%, #0a2318 60%, #0d1117 100%)",
        gap: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {[220, 320, 420].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: s,
            height: s,
            borderRadius: "50%",
            border: `1px solid rgba(37,211,102,${0.08 - i * 0.02})`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: `pulse ${3 + i}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "24px",
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 60px rgba(37,211,102,0.4), 0 0 120px rgba(37,211,102,0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Smile size={44} color="#fff" strokeWidth={1.5} />
      </div>

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "2rem",
            background: "linear-gradient(90deg, #25D366, #a8ffcd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          StickerForge
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            marginTop: "0.3rem",
            textTransform: "uppercase",
          }}
        >
          by Nexus Labs
        </div>
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.88rem",
          textAlign: "center",
          maxWidth: 240,
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1,
          margin: 0,
        }}
      >
        Créez des stickers WhatsApp personnalisés en quelques secondes.
      </p>

      <button
        onClick={onStart}
        style={{
          marginTop: "0.5rem",
          padding: "0.85rem 2.5rem",
          borderRadius: "999px",
          border: "none",
          background: "linear-gradient(90deg, #25D366 0%, #128C7E 100%)",
          color: "#fff",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          cursor: "pointer",
          letterSpacing: "0.04em",
          boxShadow: "0 4px 24px rgba(37,211,102,0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        Commencer →
      </button>

      <style>{`
        @keyframes pulse {
          from { opacity: 0.4; transform: translate(-50%,-50%) scale(0.97); }
          to   { opacity: 1;   transform: translate(-50%,-50%) scale(1.03); }
        }
      `}</style>
    </div>
  );
}

// ─── Tab Bar ───────────────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: "image", label: "Image", icon: Image },
    { id: "text",  label: "Texte", icon: Type },
    { id: "style", label: "Style", icon: Sliders },
  ];
  return (
    <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "4px", gap: "2px" }}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          style={{
            flex: 1,
            padding: "0.55rem 0",
            borderRadius: "9px",
            border: "none",
            background: active === id ? "rgba(37,211,102,0.18)" : "transparent",
            color: active === id ? "#25D366" : "rgba(255,255,255,0.4)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            fontWeight: active === id ? 700 : 400,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            transition: "all 0.2s",
            letterSpacing: "0.02em",
          }}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Editor ────────────────────────────────────────────────────────────────────
function Editor({ onBack }) {
  const canvasRef   = useRef(null);
  const fileInputRef = useRef(null);

  const [imageObj,     setImageObj]     = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [stickerText,  setStickerText]  = useState("");
  const [textColor,    setTextColor]    = useState("#ffffff");
  const [fontSize,     setFontSize]     = useState(52);
  const [fontWeight,   setFontWeight]   = useState("bold");
  const [cropShape,    setCropShape]    = useState("circle");
  const [bgColor,      setBgColor]      = useState("transparent");
  const [strokeColor,  setStrokeColor]  = useState("#25D366");
  const [strokeWidth,  setStrokeWidth]  = useState(0);
  const [activeTab,    setActiveTab]    = useState("image");
  const [isDragging,   setIsDragging]   = useState(false);
  const [toast,        setToast]        = useState({ visible: false, message: "" });

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 2500);
  };

  const loadImage = (src) =>
    new Promise((res, rej) => {
      const img = new window.Image();
      img.onload  = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const src = e.target.result;
      setUploadedImage(src);
      const img = await loadImage(src);
      setImageObj(img);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // ── Canvas draw ──────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const S = 512;
    ctx.clearRect(0, 0, S, S);

    const clipPath = () => {
      ctx.beginPath();
      if (cropShape === "circle") {
        ctx.arc(S / 2, S / 2, S / 2 - strokeWidth / 2, 0, Math.PI * 2);
      } else if (cropShape === "square") {
        const r = 40;
        ctx.moveTo(r, 0); ctx.lineTo(S - r, 0);
        ctx.quadraticCurveTo(S, 0, S, r);
        ctx.lineTo(S, S - r); ctx.quadraticCurveTo(S, S, S - r, S);
        ctx.lineTo(r, S); ctx.quadraticCurveTo(0, S, 0, S - r);
        ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
      } else {
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const x = S / 2 + (S / 2 - strokeWidth / 2) * Math.cos(angle);
          const y = S / 2 + (S / 2 - strokeWidth / 2) * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
      }
    };

    ctx.save();
    clipPath();
    ctx.clip();

    if (bgColor !== "transparent") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, S, S);
    }

    if (imageObj) {
      const scale = Math.max(S / imageObj.width, S / imageObj.height);
      const sw = imageObj.width  * scale;
      const sh = imageObj.height * scale;
      ctx.drawImage(imageObj, (S - sw) / 2, (S - sh) / 2, sw, sh);
    }

    if (stickerText) {
      ctx.font = `${fontWeight} ${fontSize}px 'Syne', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur  = 12;
      if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth   = fontSize * 0.1;
        ctx.lineJoin    = "round";
        ctx.strokeText(stickerText, S / 2, S - fontSize * 1.2);
      }
      ctx.fillStyle = textColor;
      ctx.fillText(stickerText, S / 2, S - fontSize * 1.2);
      ctx.shadowBlur = 0;
    }

    ctx.restore();

    if (strokeWidth > 0) {
      ctx.save();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth   = strokeWidth;
      clipPath();
      ctx.stroke();
      ctx.restore();
    }
  }, [imageObj, stickerText, textColor, fontSize, fontWeight, cropShape, bgColor, strokeColor, strokeWidth]);

  useEffect(() => { draw(); }, [draw]);

  const handleExport = (format = "webp") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mime   = format === "png" ? "image/png" : "image/webp";
    const url    = canvas.toDataURL(mime, 0.95);
    const a      = document.createElement("a");
    a.href       = url;
    a.download   = `sticker-nexuslabs.${format}`;
    a.click();
    showToast(`Sticker téléchargé en ${format.toUpperCase()} ✓`);
  };

  // ── Panels ───────────────────────────────────────────────────────────────
  const COLORS_BG   = ["transparent","#000000","#ffffff","#25D366","#128C7E","#FF6B6B","#FFE66D"];
  const COLORS_TEXT = ["#ffffff","#000000","#25D366","#FFE66D","#FF6B6B","#74C0FC","#f783ac"];
  const COLORS_STR  = ["#25D366","#ffffff","#000000","#FFE66D","#FF6B6B","#74C0FC"];

  const ColorPicker = ({ colors, value, onChange }) => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {colors.map((c) => (
        <div
          key={c}
          onClick={() => onChange(c)}
          style={{
            width: 32, height: 32, borderRadius: "8px",
            background: c === "transparent"
              ? "repeating-conic-gradient(#aaa 0% 25%,#fff 0% 50%) 0 0/10px 10px"
              : c,
            border: value === c ? "2px solid #25D366" : "2px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            transform: value === c ? "scale(1.15)" : "scale(1)",
            transition: "transform 0.15s",
          }}
        />
      ))}
    </div>
  );

  const renderPanel = () => {
    if (activeTab === "image") return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${isDragging ? "#25D366" : "rgba(255,255,255,0.15)"}`,
            borderRadius: "12px", padding: "1.5rem", textAlign: "center",
            cursor: "pointer",
            background: isDragging ? "rgba(37,211,102,0.06)" : "rgba(255,255,255,0.03)",
            transition: "all 0.2s",
          }}
        >
          <Image size={24} color={isDragging ? "#25D366" : "rgba(255,255,255,0.3)"} />
          <p style={{ margin: "0.5rem 0 0", fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
            {uploadedImage ? "Changer l'image" : "Glisser-déposer ou cliquer"}
          </p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />

        <label style={labelStyle}>Forme du sticker</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[["circle","Cercle"],["square","Carré"],["hexagon","Hexagone"]].map(([val, lbl]) => (
            <button key={val} onClick={() => setCropShape(val)} style={{
              flex: 1, padding: "0.55rem", borderRadius: "9px",
              border: `1.5px solid ${cropShape === val ? "#25D366" : "rgba(255,255,255,0.1)"}`,
              background: cropShape === val ? "rgba(37,211,102,0.12)" : "transparent",
              color: cropShape === val ? "#25D366" : "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem",
              cursor: "pointer", transition: "all 0.15s",
            }}>{lbl}</button>
          ))}
        </div>

        <label style={labelStyle}>Couleur de fond</label>
        <ColorPicker colors={COLORS_BG} value={bgColor} onChange={setBgColor} />
      </div>
    );

    if (activeTab === "text") return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <label style={labelStyle}>Texte du sticker</label>
        <input value={stickerText} onChange={(e) => setStickerText(e.target.value)}
          placeholder="ex : LOL, OMG, 😂…" style={inputStyle} maxLength={30} />

        <label style={labelStyle}>Couleur du texte</label>
        <ColorPicker colors={COLORS_TEXT} value={textColor} onChange={setTextColor} />

        <label style={labelStyle}>Taille de police — {fontSize}px</label>
        <input type="range" min="20" max="120" value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))} style={rangeStyle} />

        <label style={labelStyle}>Style</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[["bold","Gras"],["normal","Normal"]].map(([val,lbl]) => (
            <button key={val} onClick={() => setFontWeight(val)} style={{
              flex: 1, padding: "0.5rem", borderRadius: "9px",
              border: `1.5px solid ${fontWeight === val ? "#25D366" : "rgba(255,255,255,0.1)"}`,
              background: fontWeight === val ? "rgba(37,211,102,0.12)" : "transparent",
              color: fontWeight === val ? "#25D366" : "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans',sans-serif", fontWeight: val,
              fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s",
            }}>{lbl}</button>
          ))}
        </div>
      </div>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <label style={labelStyle}>Couleur du contour</label>
        <ColorPicker colors={COLORS_STR} value={strokeColor} onChange={setStrokeColor} />

        <label style={labelStyle}>Épaisseur du contour — {strokeWidth}px</label>
        <input type="range" min="0" max="24" value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))} style={rangeStyle} />

        <div style={{ marginTop: "0.5rem", padding: "0.75rem", background: "rgba(37,211,102,0.07)", borderRadius: "10px", border: "1px solid rgba(37,211,102,0.2)" }}>
          <p style={{ margin: 0, fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", lineHeight: 1.5 }}>
            💡 Les stickers WhatsApp doivent être en <strong style={{ color: "rgba(255,255,255,0.7)" }}>WebP</strong>, 512×512 px, avec fond transparent.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0d1117", overflowY: "auto", position: "relative" }}>
      {/* Header */}
      <div style={{ padding: "1rem 1rem 0.75rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>StickerForge</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Nexus Labs</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.4rem" }}>
          <button onClick={() => handleExport("webp")} style={exportBtnStyle("#25D366")}><Download size={12} /> WebP</button>
          <button onClick={() => handleExport("png")}  style={exportBtnStyle("rgba(255,255,255,0.12)")}><Download size={12} /> PNG</button>
        </div>
      </div>

      {/* Canvas Preview */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1.25rem 1rem", flexShrink: 0 }}>
        <div style={{ position: "relative", width: 220, height: 220, borderRadius: "1rem", overflow: "hidden" }}>
          <Checkerboard size={220} />
          <canvas ref={canvasRef} width={512} height={512}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "1rem" }} />
          {!uploadedImage && !stickerText && (
            <div
              style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "pointer" }}
              onClick={() => { setActiveTab("image"); fileInputRef.current?.click(); }}
            >
              <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(37,211,102,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px dashed rgba(37,211,102,0.4)" }}>
                <Plus size={20} color="#25D366" />
              </div>
              <span style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Importer une image</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: "0 1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flexShrink: 0 }}>
        <TabBar active={activeTab} onChange={setActiveTab} />
        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "14px", padding: "1rem", border: "1px solid rgba(255,255,255,0.06)" }}>
          {renderPanel()}
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash");
  return (
    <>
      <FontLoader />
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060a0e" }}>
        <div style={{ width: 390, height: 720, borderRadius: "40px", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)", position: "relative", background: "#0d1117" }}>
          {screen === "splash" && <SplashScreen onStart={() => setScreen("editor")} />}
          {screen === "editor" && <Editor onBack={() => setScreen("splash")} />}
        </div>
      </div>
    </>
  );
}
