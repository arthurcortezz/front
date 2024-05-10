import { Injectable } from '@angular/core';
import { compact, fromPairs } from 'lodash-es';

import { AcsMockApiHandler } from '@acs/mock-api/mock-api.request-handler';
import { AcsMockApiMethods } from '@acs/mock-api/mock-api.types';

@Injectable({
  providedIn: 'root',
})
export class AcsMockApiService {
  private _handlers: { [key: string]: Map<string, AcsMockApiHandler> } = {
    get: new Map<string, AcsMockApiHandler>(),
    post: new Map<string, AcsMockApiHandler>(),
    patch: new Map<string, AcsMockApiHandler>(),
    delete: new Map<string, AcsMockApiHandler>(),
    put: new Map<string, AcsMockApiHandler>(),
    head: new Map<string, AcsMockApiHandler>(),
    jsonp: new Map<string, AcsMockApiHandler>(),
    options: new Map<string, AcsMockApiHandler>(),
  };

  constructor() {}

  findHandler(
    method: string,
    url: string
  ): {
    handler: AcsMockApiHandler | undefined;
    urlParams: { [key: string]: string };
  } {
    const matchingHandler: {
      handler: AcsMockApiHandler | undefined;
      urlParams: { [key: string]: string };
    } = {
      handler: undefined,
      urlParams: {},
    };

    const urlParts = url.split('/');
    const handlers = this._handlers[method.toLowerCase()];

    handlers.forEach((handler, handlerUrl) => {
      if (matchingHandler.handler) {
        return;
      }

      const handlerUrlParts = handlerUrl.split('/');

      if (urlParts.length !== handlerUrlParts.length) {
        return;
      }

      const matches = handlerUrlParts.every(
        (handlerUrlPart, index) =>
          handlerUrlPart === urlParts[index] || handlerUrlPart.startsWith(':')
      );

      if (matches) {
        matchingHandler.handler = handler;
        matchingHandler.urlParams = fromPairs(
          compact(
            handlerUrlParts.map((handlerUrlPart, index) =>
              handlerUrlPart.startsWith(':')
                ? [handlerUrlPart.substring(1), urlParts[index]]
                : undefined
            )
          )
        );
      }
    });

    return matchingHandler;
  }

  onGet(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('get', url, delay);
  }

  onPost(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('post', url, delay);
  }

  onPatch(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('patch', url, delay);
  }

  onDelete(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('delete', url, delay);
  }

  onPut(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('put', url, delay);
  }

  onHead(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('head', url, delay);
  }

  onJsonp(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('jsonp', url, delay);
  }

  onOptions(url: string, delay?: number): AcsMockApiHandler {
    return this.registerHandler('options', url, delay);
  }

  private registerHandler(
    method: AcsMockApiMethods,
    url: string,
    delay?: number
  ): AcsMockApiHandler {
    const acsMockHttp = new AcsMockApiHandler(url, delay);
    this._handlers[method].set(url, acsMockHttp);
    return acsMockHttp;
  }
}
