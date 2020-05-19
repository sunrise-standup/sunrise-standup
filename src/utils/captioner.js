import {
  AudioConfig,
  SpeechTranslationConfig,
  TranslationRecognizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";

// The captioner uses Azure Cognitive Services to stream a realtime transcription
// of audio from the users microphone as they speak
class Captioner {
  _recognizer;
  _callback;

  start(callback) {

    if (!process.env.AI_API_KEY) {
      return;
    }

    this._callback = callback;

    const options = {
      key: process.env.AI_API_KEY,
      region: "eastus",
      fromLanguage: "en-US",
      toLanguages: ["en-US"],
    };

    const alreadyStarted = !!this._recognizer;
    if (alreadyStarted) {
      return;
    }

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = SpeechTranslationConfig.fromSubscription(
      options.key,
      options.region
    );

    speechConfig.speechRecognitionLanguage = options.fromLanguage;
    for (const lang of options.toLanguages) {
      speechConfig.addTargetLanguage(lang);
    }

    this._recognizer = new TranslationRecognizer(speechConfig, audioConfig);
    this._recognizer.recognizing = this._recognizer.recognized = recognizerCallback.bind(
      this
    );
    this._recognizer.startContinuousRecognitionAsync();

    // this function is called when Azure calls back with transcription information
    function recognizerCallback(s, e) {
      const result = e.result;
      const reason = ResultReason[result.reason];

      // Only process items that are speech translations
      if (reason !== "TranslatingSpeech" && reason !== "TranslatedSpeech") {
        return;
      }

      const captions = {
        offset: result.offset,
        languages: {},
      };
      captions.languages[getLanguageCode(options.fromLanguage)] = result.text;

      for (const lang of options.toLanguages) {
        const langCode = getLanguageCode(lang);
        const caption = result.translations.get(langCode);
        captions.languages[langCode] = caption;
      }

      this._callback({
        original: result.text,
        translations: captions,
      });
    }

    function getLanguageCode(lang) {
      return lang.substring(0, 2);
    }
  }

  stop() {

    if (!process.env.AI_API_KEY) {
      return;
    }

    this._recognizer.stopContinuousRecognitionAsync(
      stopRecognizer.bind(this),
      function (err) {
        stopRecognizer().bind(this);
        console.error(err);
      }.bind(this)
    );

    function stopRecognizer() {
      this._recognizer.close();
      this._recognizer = undefined;
      console.log("stopped");
    }
  }
}

const captioner = new Captioner();

export default captioner;
