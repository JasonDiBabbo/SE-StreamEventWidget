/**
 * A service for providing audio functionality.
 */
export class AudioService {
    private alertAudio: HTMLAudioElement;

    constructor() {
        this.alertAudio = document.getElementById('alert-audio') as HTMLAudioElement;
        this.alertAudio.volume = 0.35;
    }

    /**
     * Plays audio from a source.
     *
     * @param src The source location of the audio.
     * @returns A void promise.
     */
    public playAudio(src: string): Promise<void> {
        this.alertAudio.src = src;
        return this.alertAudio.play();
    }
}
