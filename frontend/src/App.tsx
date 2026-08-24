import { useCallback, useState } from "react";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiGlobe,
  FiMapPin,
  FiMic,
  FiMicOff,
  FiShield,
  FiUsers,
  FiZap,
  FiAlertCircle,
} from "react-icons/fi";
import {
  MdOutlineAutoAwesome,
  MdOutlineLanguage,
  MdOutlineRecordVoiceOver,
} from "react-icons/md";

import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { analyzeCitizenRequest, type CitizenRequest } from "./services/api";

const languages = [
  {
    value: "Marathi",
    label: "मराठी",
    native: "मराठी",
  },
  {
    value: "Hindi",
    label: "हिन्दी",
    native: "हिन्दी",
  },
  {
    value: "English",
    label: "English",
    native: "English",
  },
];

function App() {
  const [language, setLanguage] = useState("Marathi");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CitizenRequest | null>(null);
  const [error, setError] = useState("");

  const [inputMethod, setInputMethod] = useState<"TEXT" | "VOICE" | "WHATSAPP">(
    "TEXT",
  );

  const handleTranscript = useCallback((transcript: string) => {
    setMessage(transcript);
    setInputMethod("VOICE");
  }, []);

  const { isListening, supported, speechError, toggleListening } =
    useSpeechRecognition({
      language,
      onTranscript: handleTranscript,
    });

  async function handleSubmit() {
    if (!message.trim()) {
      setError("Please describe the development problem in your community.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeCitizenRequest({
        message,
        language,
        location: location || "Unknown",
        inputMethod,
      });

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleExample() {
    if (language === "Marathi") {
      setMessage(
        "आमच्या गावात गेल्या दोन वर्षांपासून रस्ता खराब आहे. पावसाळ्यात शाळेत जाणाऱ्या मुलांना खूप त्रास होतो.",
      );

      setLocation("Satara, Maharashtra");
      setInputMethod("TEXT");

      return;
    }

    if (language === "Hindi") {
      setMessage(
        "हमारे गांव में पीने के पानी की बहुत समस्या है। लोगों को कई किलोमीटर दूर से पानी लाना पड़ता है।",
      );

      setLocation("Nashik, Maharashtra");
      setInputMethod("TEXT");

      return;
    }

    setMessage(
      "Our village does not have reliable drinking water. Residents have to travel several kilometres to collect water.",
    );

    setLocation("Pune, Maharashtra");
    setInputMethod("TEXT");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f7f2] text-[#172117]">
      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173d25] text-white shadow-lg shadow-green-900/10">
              <FiActivity size={21} />

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
            </div>

            <div>
              <h1 className="text-base font-black tracking-tight">
                JanSetu AI
              </h1>

              <p className="text-[11px] font-medium text-gray-500">
                Citizen Development Intelligence
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <span className="text-[#173d25]">Citizen Portal</span>

            <span className="text-gray-400">Policy Intelligence</span>

            <span className="flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-green-700">
              <FiGlobe size={14} />
              Built for India
            </span>
          </nav>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600 md:hidden">
            <FiGlobe size={17} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
        {/* HERO */}

        <section className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
              <MdOutlineLanguage size={18} />
              Multilingual AI for India
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-[4.5rem]">
              Turn citizen voices into
              <span className="block text-[#2f6b3b]">
                development priorities.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              JanSetu AI understands citizen requests in regional languages and
              transforms them into structured development intelligence for
              policymakers.
            </p>

            {/* FEATURE PILLS */}

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <FeaturePill icon={<MdOutlineRecordVoiceOver />} label="Voice" />

              <FeaturePill icon={<MdOutlineLanguage />} label="Multilingual" />

              <FeaturePill
                icon={<MdOutlineAutoAwesome />}
                label="AI Analysis"
              />

              <FeaturePill icon={<FiBarChart2 />} label="Data Intelligence" />
            </div>

            {/* TRUST MESSAGE */}

            <div className="mt-10 flex items-start gap-3 border-l-2 border-green-600 pl-4">
              <FiShield className="mt-0.5 shrink-0 text-green-700" size={18} />

              <p className="max-w-lg text-sm leading-6 text-gray-500">
                Designed as a human-led digital public infrastructure. AI
                assists decision-making; policymakers remain in control.
              </p>
            </div>
          </div>

          {/* CITIZEN PORTAL */}

          <section className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-green-100/40 blur-3xl" />

            <div className="relative rounded-[2rem] border border-black/8 bg-white p-6 shadow-2xl shadow-black/8 sm:p-8">
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-[#2f6b3b]">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  CITIZEN PORTAL
                </div>

                <h3 className="text-2xl font-black">Tell us about a problem</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Describe an infrastructure or development issue in your
                  community.
                </p>
              </div>

              {/* LANGUAGE */}

              <label className="mb-2 block text-sm font-bold">Language</label>

              <div className="mb-5 grid grid-cols-3 gap-2">
                {languages.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setLanguage(item.value)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                      language === item.value
                        ? "border-[#2f6b3b] bg-[#edf6ee] text-[#24552e] shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50"
                    }`}
                  >
                    {item.native}
                  </button>
                ))}
              </div>

              {/* LOCATION */}

              <label className="mb-2 block text-sm font-bold">Location</label>

              <div className="relative mb-5">
                <FiMapPin
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="District, State"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* MESSAGE */}

              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-bold">
                  Your development request
                </label>

                <button
                  type="button"
                  onClick={handleExample}
                  className="text-xs font-bold text-[#2f6b3b] hover:underline"
                >
                  Try example
                </button>
              </div>

              <textarea
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setInputMethod("TEXT");
                }}
                placeholder={
                  language === "Marathi"
                    ? "तुमच्या गावातील समस्या सांगा..."
                    : language === "Hindi"
                      ? "अपने गांव की समस्या बताएं..."
                      : "Describe the problem in your community..."
                }
                rows={6}
                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

              {/* VOICE */}

              {supported ? (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`mt-3 flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3.5 text-sm font-bold transition-all ${
                    isListening
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-dashed border-gray-300 text-gray-600 hover:border-green-500 hover:bg-green-50"
                  }`}
                >
                  {isListening ? (
                    <>
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-30" />

                        <FiMicOff size={18} className="relative" />
                      </span>
                      Stop listening
                    </>
                  ) : (
                    <>
                      <FiMic size={18} />
                      Speak your request
                    </>
                  )}
                </button>
              ) : (
                <div className="mt-3 rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                  Voice input is not supported in this browser. Please use a
                  supported browser or type your request.
                </div>
              )}

              {/* SPEECH ERROR */}

              {speechError && (
                <div className="mt-3 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <FiAlertCircle size={18} className="mt-0.5 shrink-0" />

                  {speechError}
                </div>
              )}

              {/* LISTENING */}

              {isListening && (
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 [animation-delay:150ms]" />

                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 [animation-delay:300ms]" />
                  </div>
                  Listening in {language}...
                </div>
              )}

              {/* ERROR */}

              {error && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <FiAlertCircle size={18} className="mt-0.5 shrink-0" />

                  {error}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#173d25] px-5 py-4 font-bold text-white shadow-lg shadow-green-900/10 transition-all hover:-translate-y-0.5 hover:bg-[#24552e] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analyzing with Groq AI...
                  </>
                ) : (
                  <>
                    Analyse Development Request
                    <FiArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                AI-assisted analysis • Human-led decisions
              </p>
            </div>
          </section>
        </section>

        {/* RESULT */}

        {result && (
          <section className="mt-14 overflow-hidden rounded-[2rem] border border-green-200 bg-white shadow-2xl shadow-black/5">
            <div className="border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                    <FiCheckCircle size={24} />
                  </div>

                  <div>
                    <p className="text-xs font-black tracking-[0.15em] text-green-700">
                      AI ANALYSIS COMPLETE
                    </p>

                    <h3 className="mt-1 text-xl font-black">
                      Citizen request understood
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2 text-sm font-bold text-green-700">
                  <FiZap size={15} />
                  {Math.round(result.confidence * 100)}% confidence
                </div>
              </div>
            </div>

            {/* METRICS */}

            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                icon={<FiBarChart2 />}
                label="Category"
                value={result.category}
              />

              <InfoCard
                icon={<FiActivity />}
                label="Urgency"
                value={result.urgency}
              />

              <InfoCard
                icon={<FiGlobe />}
                label="Language"
                value={result.language}
              />

              <InfoCard
                icon={<FiMapPin />}
                label="Location"
                value={result.location}
              />
            </div>

            {/* PROBLEM + SUMMARY */}

            <div className="grid gap-8 border-t border-gray-100 p-6 sm:p-8 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-black tracking-[0.12em] text-gray-400">
                  <FiAlertCircle size={15} />
                  IDENTIFIED PROBLEM
                </div>

                <p className="mt-3 text-lg font-bold leading-8">
                  {result.problem}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-black tracking-[0.12em] text-gray-400">
                  <MdOutlineAutoAwesome size={17} />
                  AI SUMMARY
                </div>

                <p className="mt-3 leading-7 text-gray-600">{result.summary}</p>
              </div>
            </div>

            {/* AFFECTED GROUPS */}

            <div className="border-t border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-black tracking-[0.12em] text-gray-400">
                <FiUsers size={15} />
                AFFECTED GROUPS
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {result.affectedGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TRUST */}

        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <TrustCard
            icon={<MdOutlineLanguage size={21} />}
            title="Multilingual"
            description="Designed for India's diverse linguistic communities."
          />

          <TrustCard
            icon={<FiShield size={21} />}
            title="Privacy-aware"
            description="Data minimisation and responsible AI principles."
          />

          <TrustCard
            icon={<FiUsers size={21} />}
            title="Human-led"
            description="AI recommends. Policymakers make final decisions."
          />
        </section>
      </main>

      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <span className="font-bold text-gray-700">JanSetu AI</span> ·
            AI-powered citizen development intelligence for India.
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            AI-assisted • Human-led
          </div>
        </div>
      </footer>
    </div>
  );
}

/* FEATURE PILL */

function FeaturePill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-3 text-xs font-semibold shadow-sm">
      <span className="text-[#2f6b3b]">{icon}</span>

      {label}
    </div>
  );
}

/* INFO CARD */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <span className="text-green-600 opacity-70">{icon}</span>
      </div>

      <p className="mt-3 text-lg font-black">{value}</p>
    </div>
  );
}

/* TRUST CARD */

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-black/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-[#173d25] group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 font-black">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
}

export default App;
