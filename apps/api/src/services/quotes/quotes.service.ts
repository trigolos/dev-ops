import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

import { QuoteDto, Quote } from '@dev-ops/api-interfaces';
import { quotesRepository } from './quotes.repository';

@Injectable()
export class QuotesService {
  private static getRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  getAll(): Quote[] {
    return quotesRepository;
  }

  getRandom(): Quote {
    return QuotesService.getRandomQuote(quotesRepository);
  }

  getRandomByTag(tag: string): Quote | undefined {
    const quotesByTag = quotesRepository.filter((quote) => {
      return quote.text.includes(tag) || (quote.tags && quote.tags.includes(tag));
    });
    return QuotesService.getRandomQuote(quotesByTag);
  }

  getById(id: string): Quote | undefined {
    return quotesRepository.find((quote) => quote.id === id);
  }

  createQuote({ tags, source, author, text }: QuoteDto) {
    const currentDate = Date.now();
    const newQuote: Quote = {
      id: uuid.v4(),
      author,
      text,
      source,
      tags,
      createdBy: 'My Quote app',
      createdAt: currentDate,
      updatedAt: currentDate,
      isDeleted: false,
    };

    quotesRepository.push(newQuote);

    return newQuote;
  }

  updateQuote(id: string, { tags, source, author, text }: QuoteDto) {
    const quoteIndex = quotesRepository.findIndex((quote) => quote.id === id);
    return quoteIndex !== -1
      ? (quotesRepository[quoteIndex] = {
          ...quotesRepository[quoteIndex],
          ...(tags && { tags }),
          ...(source && { source }),
          ...(author && { author }),
          ...(text && { text }),
          updatedAt: Date.now(),
        })
      : undefined;
  }

  deleteQuote(id: string) {
    const quoteIndex = quotesRepository.findIndex((quote) => quote.id === id);
    return quoteIndex !== -1
      ? (quotesRepository[quoteIndex] = {
          ...quotesRepository[quoteIndex],
          isDeleted: true,
        })
      : undefined;
  }
}
