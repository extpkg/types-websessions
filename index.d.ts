/** EXT websessions module. */
declare namespace ext.websessions {

  /** Websession object. */
  export interface ExtWebsession {
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
  export interface ExtWebsessionProperties {
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
  export interface ExtWebsessionExtension {
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
  export interface ExtWebsessionCookie {
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
  export interface ExtWebsessionCookieFilter {
    url?: string
    name?: string
    domain?: string
    path?: string
    secure?: boolean
    session?: boolean
    httpOnly?: boolean
  }

  /** Websession cookie options. */
  export interface ExtWebsessionCookieSet {
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
  export interface ExtWebsessionProxyOptions {
    mode?: 'direct' | 'auto_detect' | 'pac_script' | 'fixed_servers' | 'system'
    pacScript?: string
    proxyRules?: string
    proxyBypassRules?: string
  }

  /** Websession network emulation options. */
  export interface ExtWebsessionNetworkEmulation {
    offline?: boolean
    latency?: number
    downloadThroughput?: number
    uploadThroughput?: number
  }

  /** Websession preconnect options. */
  export interface ExtWebsessionPreconnect {
    url: string
    numSockets?: number
  }

  /** Websession event. */
  export interface ExtWebsessionEvent {
    /** Websession ID. */
    id: string
    /** Owning extension ID. */
    extension: string
  }

  /** Websession download event. */
  export interface ExtWebsessionEventDownload {
    /** Download tag. */
    tag: string
  }

  /** Websession extension event. */
  export interface ExtWebsessionEventExtension {
    /** Chrome extension ID. */
    id: string
  }

  /** Websession cookie event. */
  export interface ExtWebsessionEventCookie {
    cause: 'explicit' | 'overwrite' | 'expired' | 'evicted' | 'expired-overwrite'
    removed: boolean
  }

  /** Websession preconnect event. */
  export interface ExtWebsessionEventPreconnect {
    url: string
    allowCredentials: boolean
  }

  /** Event handler. */
  export interface ExtWebsessionHandler<Listener> {
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
  export function get(websessionId: string): Promise<ExtWebsession>
  export function query(filter?: Partial<ExtWebsession>): Promise<ExtWebsession[]>
  export function create(properties?: ExtWebsessionProperties): Promise<ExtWebsession>
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
  export function loadExtension(websessionId: string, path: string, allowFileAccess?: boolean): Promise<ExtWebsessionExtension>
  export function removeExtension(websessionId: string, extensionId: string): Promise<void>
  export function getExtension(websessionId: string, extensionId: string): Promise<ExtWebsessionExtension>
  export function getAllExtensions(websessionId: string, path: string, allowFileAccess?: boolean): Promise<ExtWebsessionExtension[]>
  
  // Cookies
  export function getCookies(websessionId: string, filter?: ExtWebsessionCookieFilter): Promise<ExtWebsessionCookie[]>
  export function setCookie(websessionId: string, options: ExtWebsessionCookieSet): Promise<void>
  export function removeCookie(websessionId: string, url: string, name: string): Promise<void>
  export function flushCookies(websessionId: string): Promise<void>
  
  // Network
  export function enableNetworkEmulation(websessionId: string, options?: ExtWebsessionNetworkEmulation): Promise<void>
  export function disableNetworkEmulation(websessionId: string): Promise<void>
  export function closeAllConnections(websessionId: string): Promise<void>
  export function preconnect(websessionId: string, options: ExtWebsessionPreconnect): Promise<void>
  
  // Misc
  export function isPersistent(websessionId: string): Promise<boolean>
  export function setUserAgent(websessionId: string, userAgent: string, acceptLanguages?: string): Promise<void>
  export function getUserAgent(websessionId: string): Promise<string>
  export function setProxy(websessionId: string, options: ExtWebsessionProxyOptions): Promise<void>
  export function reloadProxy(websessionId: string): Promise<void>
  export function getCacheSize(websessionId: string): Promise<number>
  export function clearCache(websessionId: string): Promise<void>

  // Events

  /** Websession created. */
  export const onCreated: ExtWebsessionHandler<(event: ExtWebsessionEvent, websession: ExtWebsession) => void>
  /** Websession removed. */
  export const onRemoved: ExtWebsessionHandler<(event: ExtWebsessionEvent, websession: ExtWebsession) => void>
  /** Download started. */
  export const onDownloadStart: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventDownload) => void>
  /** Download finished. */
  export const onDownloadDone: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventDownload) => void>
  /** Download state updated. */
  export const onDownloadUpdated: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventDownload) => void>
  /** Chrome extension loaded. */
  export const onExtensionLoaded: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventExtension) => void>
  /** Chrome extension is ready. */
  export const onExtensionReady: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventExtension) => void>
  /** Chrome extension unloaded. */
  export const onExtensionUnloaded: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventExtension) => void>
  /** Cookie updated. */
  export const onCookieUpdated: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventCookie, cookie: ExtWebsessionCookie) => void>
  /** A connection is about to be established. */
  export const onPreconnect: ExtWebsessionHandler<(event: ExtWebsessionEvent, details: ExtWebsessionEventPreconnect) => void>

}
