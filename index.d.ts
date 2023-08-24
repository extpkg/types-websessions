/** EXT websessions module. */
declare namespace ext.websessions {

  /** Websession object. */
  export interface Websession {
    /** Websession ID. */
    id: string
    /** Owning extension ID. */
    extension: string
    /** Partition key. */
    partition: string
    /** True if websession is persistent across restarts. */
    persistent: boolean
    /** Enable usage of cache. */
    cache: boolean
  }

  /** Websession creation properties. */
  export interface WebsessionProperties {
    /** Partition key. */
    partition?: string
    /** True if websession is persistent across restarts. */
    persistent?: boolean
    /** Allow other extensions to use this websession. */
    global?: boolean
     /** Enable usage of cache. */
    cache?: boolean
  }

  /** Chrome extension. */
  export interface ChromeExtension {
    /** Chrome extension ID. */
    id: string
    /** Chrome extension manifest. */
    manifest: unknown
    /** Chrome extension name. */
    name: string
    /** Chrome extension path. */
    path: string
    /** Chrome extension version. */
    version: string
    /** Chrome extension url. */
    url: string
  }

  /** Websession cookie. */
  export interface Cookie {
    name: string
    value: string
    domain?: string
    hostOnly?: boolean
    path?: string
    secure?: boolean
    httpOnly?: boolean
    session?: boolean
    expirationDate?: number
    sameSite: 'unspecified' | 'no_restriction' | 'lax' | 'strict'
  }

  /** Websession query filter. */
  export interface CookieFilter {
    url?: string
    name?: string
    domain?: string
    path?: string
    secure?: boolean
    session?: boolean
    httpOnly?: boolean
  }

  /** Websession cookie options. */
  export interface CookieSet {
    url: string
    name?: string
    value?: string
    domain?: string
    path?: string
    secure?: boolean
    httpOnly?: boolean
    expirationDate?: number
    sameSite?: 'unspecified' | 'no_restriction' | 'lax' | 'strict'
  }

  /** Websession proxy options. */
  export interface ProxyOptions {
    mode?: 'direct' | 'auto_detect' | 'pac_script' | 'fixed_servers' | 'system'
    pacScript?: string
    proxyRules?: string
    proxyBypassRules?: string
  }

  /** Websession network emulation options. */
  export interface NetworkEmulation {
    offline?: boolean
    latency?: number
    downloadThroughput?: number
    uploadThroughput?: number
  }

  /** Websession preconnect options. */
  export interface Preconnect {
    url: string
    numSockets?: number
  }

  /** Websession event. */
  export interface WebsessionEvent {
    /** Websession ID. */
    id: string
    /** Owning extension ID. */
    extension: string
  }

  /** Websession download event. */
  export interface EventDownload {
    /** Download tag. */
    tag: string
  }

  /** Websession extension event. */
  export interface EventExtension {
    /** Chrome extension ID. */
    id: string
  }

  /** Websession cookie event. */
  export interface EventCookie {
    cause: 'explicit' | 'overwrite' | 'expired' | 'evicted' | 'expired-overwrite'
    removed: boolean
  }

  /** Websession preconnect event. */
  export interface EventPreconnect {
    url: string
    allowCredentials: boolean
  }

  /** Event handler. */
  interface EventHandler<Listener> {
    /**
     * Register listener.
     * @param listener Listener to invoke.
     */
    addListener: (listener: Listener) => void
    /**
     * Unregister listener.
     * @param listener Listener to unregister.
     */
    removeListener: (listener: Listener) => void
  }

  // Generic
  export function get(websessionId: string): Promise<Websession>
  export function query(filter?: Partial<Websession>): Promise<Websession[]>
  export function create(properties?: WebsessionProperties): Promise<Websession>
  export function remove(websessionIds: string | string[]): Promise<void>
  
  // Downloads
  export function downloadURL(websessionId: string, url: string): Promise<void>
  export function downloadPause(websessionId: string, downloadTag: string): Promise<void>
  export function downloadIsPaused(websessionId: string, downloadTag: string): Promise<boolean>
  export function downloadResume(websessionId: string, downloadTag: string): Promise<void>
  export function downloadCanResume(websessionId: string, downloadTag: string):  Promise<boolean>
  export function downloadGetURL(websessionId: string, downloadTag: string): Promise<string>
  export function downloadGetMimeType(websessionId: string, downloadTag: string): Promise<string>
  export function downloadHasUserGesture(websessionId: string, downloadTag: string): Promise<boolean>
  export function downloadGetFilename(websessionId: string, downloadTag: string): Promise<string>
  export function downloadGetTotalBytes(websessionId: string, downloadTag: string): Promise<number>
  export function downloadGetReceivedBytes(websessionId: string, downloadTag: string): Promise<number>
  export function downloadGetContentDisposition(websessionId: string, downloadTag: string): Promise<string>
  export function downloadGetState(websessionId: string, downloadTag: string): Promise<'progressing'|'completed'|'cancelled'|'interrupted'>
  export function downloadGetURLChain(websessionId: string, downloadTag: string): Promise<string[]>
  export function downloadGetLastModifiedTime(websessionId: string, downloadTag: string): Promise<string>
  export function downloadGetETag(websessionId: string, downloadTag: string): Promise<string>
  export function downloadGetStartTime(websessionId: string, downloadTag: string): Promise<number>
  export function downloadGetSavePath(websessionId: string, downloadTag: string): Promise<string>
  
  // Chrome extensions
  export function loadExtension(websessionId: string, path: string, allowFileAccess?: boolean): Promise<ChromeExtension>
  export function removeExtension(websessionId: string, extensionId: string): Promise<void>
  export function getExtension(websessionId: string, extensionId: string): Promise<ChromeExtension>
  export function getAllExtensions(websessionId: string, path: string, allowFileAccess?: boolean): Promise<ChromeExtension[]>
  
  // Cookies
  export function getCookies(websessionId: string, filter?: CookieFilter): Promise<Cookie[]>
  export function setCookie(websessionId: string, options: CookieSet): Promise<void>
  export function removeCookie(websessionId: string, url: string, name: string): Promise<void>
  export function flushCookies(websessionId: string): Promise<void>
  
  // Network
  export function enableNetworkEmulation(websessionId: string, options?: NetworkEmulation): Promise<void>
  export function disableNetworkEmulation(websessionId: string): Promise<void>
  export function closeAllConnections(websessionId: string): Promise<void>
  export function preconnect(websessionId: string, options: Preconnect): Promise<void>
  
  // Misc
  export function isPersistent(websessionId: string): Promise<boolean>
  export function setUserAgent(websessionId: string, userAgent: string, acceptLanguages?: string): Promise<void>
  export function getUserAgent(websessionId: string): Promise<string>
  export function setProxy(websessionId: string, options: ProxyOptions): Promise<void>
  export function reloadProxy(websessionId: string): Promise<void>
  export function getCacheSize(websessionId: string): Promise<number>
  export function clearCache(websessionId: string): Promise<void>

  // Events

  /** Websession created. */
  export const onCreated: EventHandler<(event: WebsessionEvent, websession: Websession) => void>
  /** Websession removed. */
  export const onRemoved: EventHandler<(event: WebsessionEvent, websession: Websession) => void>
  /** Download started. */
  export const onDownloadStart: EventHandler<(event: WebsessionEvent, details: EventDownload) => void>
  /** Download finished. */
  export const onDownloadDone: EventHandler<(event: WebsessionEvent, details: EventDownload) => void>
  /** Download state updated. */
  export const onDownloadUpdated: EventHandler<(event: WebsessionEvent, details: EventDownload) => void>
  /** Chrome extension loaded. */
  export const onExtensionLoaded: EventHandler<(event: WebsessionEvent, details: EventExtension) => void>
  /** Chrome extension is ready. */
  export const onExtensionReady: EventHandler<(event: WebsessionEvent, details: EventExtension) => void>
  /** Chrome extension unloaded. */
  export const onExtensionUnloaded: EventHandler<(event: WebsessionEvent, details: EventExtension) => void>
  /** Cookie updated. */
  export const onCookieUpdated: EventHandler<(event: WebsessionEvent, details: EventCookie, cookie: Cookie) => void>
  /** A connection is about to be established. */
  export const onPreconnect: EventHandler<(event: WebsessionEvent, details: EventPreconnect) => void>

}
