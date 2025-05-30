import { generateImages } from 'pwa-asset-generator';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePWAIcons() {
    const source = join(__dirname, 'logo.png');
    const outputPath = join(__dirname, 'public', 'icons');
    
    try {
        // Ensure public directory exists
        await fs.mkdir(join(__dirname, 'public'), { recursive: true });
        
        // Ensure icons directory exists
        await fs.mkdir(outputPath, { recursive: true });
        
        // Generate images without manifest update
        const result = await generateImages(source, outputPath, {
            scrape: false,
            background: "#ffffff",
            padding: "10%",
            iconOnly: true,
            log: true,
            generateIconOptions: {
                baseIcon: {
                    sizes: [72, 96, 128, 144, 152, 192, 384, 512],
                    purpose: ['maskable', 'any']
                },
                favicon: {
                    sizes: [16, 32, 48]
                }
            }
        });

        // Manually update manifest.json
        const manifestPath = join(__dirname, 'public', 'manifest.json');
        const manifest = {
            name: "MenuMitra",
            short_name: "MenuMitra",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone",
            scope: "/",
            start_url: "/",
            icons: [
                {
                    src: "icons/icon-72x72.png",
                    sizes: "72x72",
                    type: "image/png"
                },
                {
                    src: "icons/icon-96x96.png",
                    sizes: "96x96",
                    type: "image/png"
                },
                {
                    src: "icons/icon-128x128.png",
                    sizes: "128x128",
                    type: "image/png"
                },
                {
                    src: "icons/icon-144x144.png",
                    sizes: "144x144",
                    type: "image/png"
                },
                {
                    src: "icons/icon-152x152.png",
                    sizes: "152x152",
                    type: "image/png"
                },
                {
                    src: "icons/icon-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "icons/icon-384x384.png",
                    sizes: "384x384",
                    type: "image/png"
                },
                {
                    src: "icons/icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                },
                {
                    src: "icons/maskable-icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                }
            ]
        };

        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        
        console.log('PWA icons and manifest.json generated successfully! 🎉');
    } catch (error) {
        console.error('Error:', error);
    }
}

generatePWAIcons();