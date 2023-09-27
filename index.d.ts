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
    /** Name of the cookie. */
    name: string
    /** Value stored in the cookie. */
    value: string
    /** Domain associated with the cookie. */
    domain?: string
    /** Indicates if the cookie is host-only. */
    hostOnly?: boolean
    /** Path for the cookie. */
    path?: string
    /** Indicates if the cookie is secure. */
    secure?: boolean
    /** Indicates if the cookie is HTTP only. */
    httpOnly?: boolean
    /** Indicates if the cookie is a session cookie. */
    session?: boolean
    /** Expiration date of the cookie. */
    expirationDate?: number
    /** SameSite attribute of the cookie. */
    sameSite: 'unspecified' | 'no_restriction' | 'lax' | 'strict'
  }

  /** Websession query filter. */
  export interface CookieFilter {
    /** URL to filter cookies by. */
    url?: string
    /** Name to filter cookies by. */
    name?: string
    /** Domain to filter cookies by. */
    domain?: string
    /** Path to filter cookies by. */
    path?: string
    /** Filter cookies by secure attribute. */
    secure?: boolean
    /** Filter by session cookies. */
    session?: boolean
    /** Filter by HTTP only cookies. */
    httpOnly?: boolean
  }

  /** Websession cookie options. */
  export interface CookieSet {
    /** URL where the cookie will be set. */
    url: string
    /** Name of the cookie. */
    name?: string
    /** Value for the cookie. */
    value?: string
    /** Domain for the cookie. */
    domain?: string
    /** Path for the cookie. */
    path?: string
    /** Set cookie as secure. */
    secure?: boolean
    /** Set cookie as HTTP only. */
    httpOnly?: boolean
    /** Expiration date for the cookie. */
    expirationDate?: number
    /** SameSite attribute for the cookie. */
    sameSite?: 'unspecified' | 'no_restriction' | 'lax' | 'strict'
  }

  /** Websession proxy options. */
  export interface ProxyOptions {
    /** Proxy mode. */
    mode?: 'direct' | 'auto_detect' | 'pac_script' | 'fixed_servers' | 'system'
    /** PAC script URL for proxy configuration. */
    pacScript?: string
    /** Rules for the proxy. */
    proxyRules?: string
    /** Rules to bypass the proxy. */
    proxyBypassRules?: string
  }

  /** Websession network emulation options. */
  export interface NetworkEmulation {
    /** Set the session to offline mode. */
    offline?: boolean
    /** Network latency in milliseconds. */
    latency?: number
    /** Download speed in bytes per second. */
    downloadThroughput?: number
    /** Upload speed in bytes per second. */
    uploadThroughput?: number
  }

  /** Websession preconnect options. */
  export interface Preconnect {
    /** URL to preconnect to. */
    url: string
    /** Number of sockets to preconnect. */
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
    /** Cause of the cookie event. */
    cause: 'explicit' | 'overwrite' | 'expired' | 'evicted' | 'expired-overwrite'
    /** Indicates if the cookie was removed. */
    removed: boolean
  }

  /** Websession preconnect event. */
  export interface EventPreconnect {
    /** URL associated with the preconnect event. */
    url: string
    /** Indicates if credentials are allowed for the preconnect. */
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

  /**
   * Gets the websession by ID.
   * @param websessionId The ID of the websession to get.
   * @returns The promise resolves with the websession object.
   */
  export function get(websessionId: string): Promise<Websession>
  
  /**
   * Query websessions based on filter.
   * @param filter Filter criteria for querying websessions.
   * @returns The promise resolves with an array of websession objects that match the filter.
   */
  export function query(filter?: Partial<Websession>): Promise<Websession[]>
  
  /**
   * Create a new websession.
   * @param properties Properties for the new websession.
   * @returns The promise resolves with the created websession object.
   */
  export function create(properties?: WebsessionProperties): Promise<Websession>
  
  /**
   * Remove websession.
   * @param websessionIds Array of websession IDs to remove.
   * @returns The promise resolves when the websession(s) have been removed.
   */
  export function remove(websessionIds: string | string[]): Promise<void>
  
  // Downloads

  /**
   * Download URL in specified websession.
   * @param websessionId The ID of the websession.
   * @param url The URL to download.
   * @returns The promise resolves when the URL has started downloading in the specified websession.
   */
  export function downloadURL(websessionId: string, url: string): Promise<void>
  
  /**
   * Pause a download in specified websession.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download to pause.
   * @returns The promise resolves when the download has been paused.
   */
  export function downloadPause(websessionId: string, downloadTag: string): Promise<void>
  
  /**
   * Check if a download is paused in specified websession.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download to check.
   * @returns The promise resolves with a boolean indicating if the download is paused.
   */
  export function downloadIsPaused(websessionId: string, downloadTag: string): Promise<boolean>
  
  /**
   * Resume a download in specified websession.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download to resume.
   * @returns The promise resolves when the download has been resumed.
   */
  export function downloadResume(websessionId: string, downloadTag: string): Promise<void>
  
  /**
   * Check if a download can be resumed.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download to check.
   * @returnsThe promise resolves with a boolean indicating if the download can be resumed.
   */
  export function downloadCanResume(websessionId: string, downloadTag: string):  Promise<boolean>
  
  /**
   * Get download URL.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the URL of the download.
   */
  export function downloadGetURL(websessionId: string, downloadTag: string): Promise<string>
  
  /**
   * Get download MIME type.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the MIME type of the download.
   */
  export function downloadGetMimeType(websessionId: string, downloadTag: string): Promise<string>
  
  /**
   * Check if download has user gesture.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with a boolean indicating if the download has a user gesture.
   */
  export function downloadHasUserGesture(websessionId: string, downloadTag: string): Promise<boolean>
  
  /**
   * Get download filename.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the filename of the download.
   */
  export function downloadGetFilename(websessionId: string, downloadTag: string): Promise<string>
  
  /**
   * Get total bytes of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the total bytes of the download.
   */
  export function downloadGetTotalBytes(websessionId: string, downloadTag: string): Promise<number>
  
  /**
   * Get received bytes of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the received bytes of the download.
   */
  export function downloadGetReceivedBytes(websessionId: string, downloadTag: string): Promise<number>
  
  /**
   * Get content disposition of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the content disposition of the download.
   */
  export function downloadGetContentDisposition(websessionId: string, downloadTag: string): Promise<string>
  
  /**
   * Get the current state of a specific download within a websession.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the current state of the download.
   */
  export function downloadGetState(websessionId: string, downloadTag: string): Promise<'progressing'|'completed'|'cancelled'|'interrupted'>
  
  /**
   * Get URL chain of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the URL chain of the download.
   */
  export function downloadGetURLChain(websessionId: string, downloadTag: string): Promise<string[]>
  
  /**
   * Get last modified time of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the last modified time of the download.
   */
  export function downloadGetLastModifiedTime(websessionId: string, downloadTag: string): Promise<string>
  
  /**
   * Get ETag of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the ETag of the download.
   */
  export function downloadGetETag(websessionId: string, downloadTag: string): Promise<string>
  
  /**
   * Get start time of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the start time of the download.
   */
  export function downloadGetStartTime(websessionId: string, downloadTag: string): Promise<number>
  
  /**
   * Get save path of download.
   * @param websessionId The ID of the websession.
   * @param downloadTag The tag of the download.
   * @returns The promise resolves with the save path of the download.
   */
  export function downloadGetSavePath(websessionId: string, downloadTag: string): Promise<string>
  
  // Chrome extensions

  /**
   * Load a Chrome extension in websession.
   * @param websessionId The ID of the websession.
   * @param path The path to the Chrome extension.
   * @param allowFileAccess Allow file access for the extension.
   * @returns The promise resolves with the loaded Chrome extension details.
   */
  export function loadExtension(websessionId: string, path: string, allowFileAccess?: boolean): Promise<ChromeExtension>
  
  /**
   * Remove a Chrome extension from websession.
   * @param websessionId The ID of the websession.
   * @param extensionId The ID of the Chrome extension to remove.
   * @returns The promise resolves when the Chrome extension has been removed.
   */
  export function removeExtension(websessionId: string, extensionId: string): Promise<void>
  
  /**
   * Get a Chrome extension from websession.
   * @param websessionId The ID of the websession.
   * @param extensionId The ID of the Chrome extension to get.
   * @returns The promise resolves with the details of the Chrome extension or null if not found.
   */
  export function getExtension(websessionId: string, extensionId: string): Promise<ChromeExtension | null>
  
  /**
   * Get all Chrome extensions from websession.
   * @param websessionId The ID of the websession.
   * @param path The path to the Chrome extensions.
   * @param allowFileAccess Allow file access for the extensions.
   * @returns The promise resolves with an array of all Chrome extensions in the websession.
   */
  export function getAllExtensions(websessionId: string, path: string, allowFileAccess?: boolean): Promise<ChromeExtension[]>
  
  // Cookies
  
  /**
   * Get cookies from websession.
   * @param websessionId The ID of the websession.
   * @param filter Filter criteria for querying cookies.
   * @returns The promise resolves with an array of cookies that match the filter.
   */
  export function getCookies(websessionId: string, filter?: CookieFilter): Promise<Cookie[]>
  
  /**
   * Set a cookie in websession.
   * @param websessionId The ID of the websession.
   * @param options Options for setting the cookie.
   * @returns The promise resolves when the cookie has been set.
   */
  export function setCookie(websessionId: string, options: CookieSet): Promise<void>
  
  /**
   * Remove a cookie from websession.
   * @param websessionId The ID of the websession.
   * @param url The URL from which to remove the cookie.
   * @param name The name of the cookie to remove.
   * @returns The promise resolves when the cookie has been removed.
   */
  export function removeCookie(websessionId: string, url: string, name: string): Promise<void>
  
  /**
   * Flush cookies in websession.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves when the cookies have been flushed.
   */
  export function flushCookies(websessionId: string): Promise<void>
  
  // Network
  
  /**
   * Enable network emulation in websession.
   * @param websessionId The ID of the websession.
   * @param options Options for enabling network emulation.
   * @returns The promise resolves when network emulation has been enabled.
   */
  export function enableNetworkEmulation(websessionId: string, options?: NetworkEmulation): Promise<void>
  
  /**
   * Disable network emulation in websession.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves when network emulation has been disabled.
   */
  export function disableNetworkEmulation(websessionId: string): Promise<void>
  
  /**
   * Close all connections in websession.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves when all connections have been closed.
   */
  export function closeAllConnections(websessionId: string): Promise<void>
  
  /**
   * Preconnect in websession.
   * @param websessionId The ID of the websession.
   * @param options Options for preconnecting.
   * @returns The promise resolves when the preconnect has been initiated.
   */
  export function preconnect(websessionId: string, options: Preconnect): Promise<void>
  
  // Misc
  
  /**
   * Check if websession is persistent.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves with a boolean indicating if the websession is persistent.
   */
  export function isPersistent(websessionId: string): Promise<boolean>
  
  /**
   * Set user agent in websession.
   * @param websessionId The ID of the websession.
   * @param userAgent The user agent string to set.
   * @param acceptLanguages Accept languages header.
   * @returns The promise resolves when the user agent has been set.
   */
  export function setUserAgent(websessionId: string, userAgent: string, acceptLanguages?: string): Promise<void>
  
  /**
   * Get user agent from websession.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves with the user agent string.
   */
  export function getUserAgent(websessionId: string): Promise<string>
  
  /**
   * Set proxy in websession.
   * @param websessionId The ID of the websession.
   * @param options Options for setting the proxy.
   * @returns The promise resolves when the proxy has been set.
   */
  export function setProxy(websessionId: string, options: ProxyOptions): Promise<void>
  
  /**
   * Reload proxy in websession.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves when the proxy has been reloaded.
   */
  export function reloadProxy(websessionId: string): Promise<void>
  
  /**
   * Get cache size in websession.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves with the size of the cache.
   */
  export function getCacheSize(websessionId: string): Promise<number>
  
  /**
   * Clear cache in websession.
   * @param websessionId The ID of the websession.
   * @returns The promise resolves when the cache has been cleared.
   */
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
