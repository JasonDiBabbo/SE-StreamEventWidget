/**
 * A service for providing audio functionality
 */
export class AudioService {
    /**
     * Initializes a new instance of the {@link AudioService} class
     *
     * @param audioElement The DOM audio element to use
     */
    constructor(private audioElement: HTMLAudioElement, volume?: number) {
        if (volume) {
            this.audioElement.volume = volume;
        } else {
            this.audioElement.volume = 0.35; // Default value
        }
    }

    /**
     * Plays audio from a source
     *
     * @param src The audio source
     * @returns A promise to play the audio
     */
    public playAudio(src: string): Promise<void> {
        this.audioElement.src = src;
        return this.audioElement.play();
    }
}
