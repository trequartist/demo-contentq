// Advanced Matching Algorithm with Multiple Strategies
// This uses fuzzy logic, Levenshtein distance, semantic similarity, and contextual understanding

export class AdvancedMatcher {
  // Common typos and their corrections
  private typoMap = new Map([
    ['craete', 'create'],
    ['cretae', 'create'],
    ['creat', 'create'],
    ['ceate', 'create'],
    ['cerate', 'create'],
    ['naviagte', 'navigate'],
    ['naviaget', 'navigate'],
    ['navigat', 'navigate'],
    ['anayltics', 'analytics'],
    ['analytcs', 'analytics'],
    ['anlytics', 'analytics'],
    ['dashbaord', 'dashboard'],
    ['dashbord', 'dashboard'],
    ['dasboard', 'dashboard'],
    ['calender', 'calendar'],
    ['calander', 'calendar'],
    ['calandar', 'calendar'],
    ['diagnositcs', 'diagnostics'],
    ['dignostics', 'diagnostics'],
    ['diagnistics', 'diagnostics'],
    ['playboko', 'playbook'],
    ['plabook', 'playbook'],
    ['plybook', 'playbook'],
    ['insigths', 'insights'],
    ['insihts', 'insights'],
    ['inisghts', 'insights'],
    ['exprot', 'export'],
    ['exoprt', 'export'],
    ['epxort', 'export'],
    ['shcedule', 'schedule'],
    ['schdule', 'schedule'],
    ['shedule', 'schedule']
  ]);

  // Semantic groups - different ways to say the same thing
  private semanticGroups = {
    create: ['create', 'make', 'build', 'generate', 'produce', 'craft', 'develop', 'write', 'compose', 'draft', 'start', 'new', 'add', 'begin'],
    navigate: ['go', 'navigate', 'open', 'show', 'display', 'view', 'see', 'take me', 'bring me', 'switch', 'move', 'jump', 'head'],
    analyze: ['analyze', 'examine', 'investigate', 'study', 'research', 'explore', 'review', 'check', 'inspect', 'look at', 'understand'],
    optimize: ['optimize', 'improve', 'enhance', 'boost', 'increase', 'maximize', 'upgrade', 'make better', 'fix', 'repair', 'polish'],
    export: ['export', 'download', 'save', 'get', 'extract', 'output', 'generate report', 'create file'],
    delete: ['delete', 'remove', 'trash', 'discard', 'cancel', 'undo', 'clear', 'wipe', 'destroy', 'eliminate'],
    schedule: ['schedule', 'plan', 'set time', 'arrange', 'book', 'organize', 'queue', 'line up', 'prepare'],
    click: ['click', 'press', 'tap', 'hit', 'push', 'activate', 'trigger', 'fire', 'execute', 'run', 'do'],
    close: ['close', 'exit', 'quit', 'dismiss', 'hide', 'cancel', 'escape', 'leave', 'go back'],
    help: ['help', 'assist', 'guide', 'what can', 'how to', 'show me how', 'explain', 'tutorial', 'instructions']
  };

  // Contextual hints - what might come after certain words
  private contextualHints = {
    create: ['blog', 'post', 'article', 'content', 'linkedin', 'email', 'newsletter', 'campaign'],
    go: ['dashboard', 'analytics', 'insights', 'content', 'calendar', 'diagnostics', 'playbook', 'assets', 'settings'],
    export: ['pdf', 'csv', 'json', 'excel', 'report', 'data', 'analytics', 'metrics'],
    fix: ['issues', 'problems', 'errors', 'seo', 'performance', 'broken links', 'speed', 'accessibility'],
    show: ['metrics', 'data', 'report', 'dashboard', 'analytics', 'insights', 'calendar', 'tasks'],
    open: ['modal', 'dialog', 'menu', 'settings', 'file', 'document', 'editor', 'preview']
  };

  // Slang and casual phrases
  private slangMap = new Map([
    ['gimme', 'give me'],
    ['wanna', 'want to'],
    ['gonna', 'going to'],
    ['lemme', 'let me'],
    ['plz', 'please'],
    ['pls', 'please'],
    ['thx', 'thanks'],
    ['ty', 'thank you'],
    ['asap', 'immediately'],
    ['rn', 'right now'],
    ['btw', 'by the way'],
    ['fyi', 'for your information'],
    ['lmk', 'let me know'],
    ['np', 'no problem'],
    ['omw', 'on my way'],
    ['brb', 'be right back']
  ]);

  // Emoji to intent mapping
  private emojiMap = new Map([
    ['📝', 'create'],
    ['✍️', 'write'],
    ['📊', 'analytics'],
    ['📈', 'metrics'],
    ['📅', 'calendar'],
    ['🔍', 'search'],
    ['💾', 'save'],
    ['📤', 'export'],
    ['📥', 'import'],
    ['🗑️', 'delete'],
    ['⚙️', 'settings'],
    ['🏠', 'dashboard'],
    ['📧', 'email'],
    ['🔗', 'link'],
    ['✅', 'complete'],
    ['❌', 'cancel'],
    ['🚀', 'launch'],
    ['🎯', 'target'],
    ['💡', 'idea'],
    ['🔧', 'fix']
  ]);

  // Calculate Levenshtein distance for fuzzy matching
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Soundex algorithm for phonetic matching
  private soundex(str: string): string {
    const cleaned = str.toUpperCase().replace(/[^A-Z]/g, '');
    if (!cleaned) return '';
    
    let soundex = cleaned[0];
    const soundexMap: Record<string, string> = {
      B: '1', F: '1', P: '1', V: '1',
      C: '2', G: '2', J: '2', K: '2', Q: '2', S: '2', X: '2', Z: '2',
      D: '3', T: '3',
      L: '4',
      M: '5', N: '5',
      R: '6'
    };
    
    let prevCode = soundexMap[cleaned[0]] || '0';
    
    for (let i = 1; i < cleaned.length && soundex.length < 4; i++) {
      const code = soundexMap[cleaned[i]] || '0';
      if (code !== '0' && code !== prevCode) {
        soundex += code;
      }
      prevCode = code;
    }
    
    return soundex.padEnd(4, '0');
  }

  // N-gram similarity for partial matches
  private ngramSimilarity(str1: string, str2: string, n: number = 2): number {
    const ngrams1 = this.getNgrams(str1, n);
    const ngrams2 = this.getNgrams(str2, n);
    
    let matches = 0;
    ngrams1.forEach(gram => {
      if (ngrams2.has(gram)) matches++;
    });
    
    return matches / Math.max(ngrams1.size, ngrams2.size);
  }

  private getNgrams(str: string, n: number): Set<string> {
    const ngrams = new Set<string>();
    for (let i = 0; i <= str.length - n; i++) {
      ngrams.add(str.slice(i, i + n));
    }
    return ngrams;
  }

  // Main matching function
  match(input: string, target: string): number {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedTarget = target.toLowerCase().trim();
    
    // Exact match
    if (normalizedInput === normalizedTarget) return 1.0;
    
    // Contains match
    if (normalizedInput.includes(normalizedTarget) || normalizedTarget.includes(normalizedInput)) {
      return 0.9;
    }
    
    // Typo correction
    const correctedInput = this.correctTypos(normalizedInput);
    if (correctedInput === normalizedTarget) return 0.85;
    
    // Semantic match
    const semanticScore = this.semanticMatch(normalizedInput, normalizedTarget);
    if (semanticScore > 0.8) return semanticScore;
    
    // Fuzzy match with Levenshtein
    const distance = this.levenshteinDistance(normalizedInput, normalizedTarget);
    const maxLength = Math.max(normalizedInput.length, normalizedTarget.length);
    const levenshteinScore = 1 - (distance / maxLength);
    
    // Phonetic match with Soundex
    const soundexScore = this.soundex(normalizedInput) === this.soundex(normalizedTarget) ? 0.7 : 0;
    
    // N-gram similarity
    const ngramScore = this.ngramSimilarity(normalizedInput, normalizedTarget);
    
    // Weighted combination
    return Math.max(
      levenshteinScore * 0.4,
      soundexScore * 0.3,
      ngramScore * 0.3,
      semanticScore
    );
  }

  // Correct common typos
  private correctTypos(input: string): string {
    // Check exact typo match
    if (this.typoMap.has(input)) {
      return this.typoMap.get(input)!;
    }
    
    // Check each word for typos
    const words = input.split(' ');
    const corrected = words.map(word => {
      if (this.typoMap.has(word)) {
        return this.typoMap.get(word)!;
      }
      
      // Check for close typos (1-2 character difference)
      for (const [typo, correction] of this.typoMap) {
        if (this.levenshteinDistance(word, typo) <= 2) {
          return correction;
        }
      }
      
      return word;
    });
    
    return corrected.join(' ');
  }

  // Semantic matching
  private semanticMatch(input: string, target: string): number {
    for (const [key, synonyms] of Object.entries(this.semanticGroups)) {
      if (synonyms.includes(target)) {
        for (const synonym of synonyms) {
          if (input.includes(synonym)) {
            return 0.85;
          }
        }
      }
    }
    return 0;
  }

  // Extract intent from natural language
  extractIntent(input: string): { intent: string; confidence: number; entities: any } {
    const normalized = input.toLowerCase().trim();
    const corrected = this.correctTypos(normalized);
    
    // Replace slang
    let processed = corrected;
    for (const [slang, proper] of this.slangMap) {
      processed = processed.replace(new RegExp(`\\b${slang}\\b`, 'g'), proper);
    }
    
    // Check for emoji intent
    for (const [emoji, intent] of this.emojiMap) {
      if (processed.includes(emoji)) {
        return {
          intent,
          confidence: 0.9,
          entities: { emoji: true }
        };
      }
    }
    
    // Find best matching intent
    let bestIntent = '';
    let bestScore = 0;
    let entities: any = {};
    
    for (const [intent, synonyms] of Object.entries(this.semanticGroups)) {
      for (const synonym of synonyms) {
        if (processed.includes(synonym)) {
          const score = 0.9;
          if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
          }
          break;
        }
      }
    }
    
    // Extract entities (targets, parameters)
    entities = this.extractEntities(processed);
    
    return {
      intent: bestIntent || 'unknown',
      confidence: bestScore,
      entities
    };
  }

  // Extract entities from input
  private extractEntities(input: string): any {
    const entities: any = {};
    
    // Extract page/navigation targets
    const pages = ['dashboard', 'content', 'calendar', 'diagnostics', 'playbook', 'insights', 'analytics', 'assets', 'settings'];
    for (const page of pages) {
      if (input.includes(page)) {
        entities.target = page;
        break;
      }
    }
    
    // Extract content types
    const contentTypes = ['blog', 'article', 'post', 'linkedin', 'email', 'newsletter'];
    for (const type of contentTypes) {
      if (input.includes(type)) {
        entities.contentType = type;
        break;
      }
    }
    
    // Extract formats
    const formats = ['pdf', 'csv', 'json', 'excel', 'markdown'];
    for (const format of formats) {
      if (input.includes(format)) {
        entities.format = format;
        break;
      }
    }
    
    // Extract time references
    const timePatterns = [
      { pattern: /today/i, value: 'today' },
      { pattern: /tomorrow/i, value: 'tomorrow' },
      { pattern: /yesterday/i, value: 'yesterday' },
      { pattern: /next week/i, value: 'next_week' },
      { pattern: /last week/i, value: 'last_week' },
      { pattern: /this month/i, value: 'this_month' },
      { pattern: /last month/i, value: 'last_month' }
    ];
    
    for (const { pattern, value } of timePatterns) {
      if (pattern.test(input)) {
        entities.timeframe = value;
        break;
      }
    }
    
    // Extract topics (everything after "about")
    const topicMatch = input.match(/(?:about|regarding|concerning|on)\s+(.+)/i);
    if (topicMatch) {
      entities.topic = topicMatch[1].trim();
    }
    
    return entities;
  }

  // Get suggestions based on partial input
  getSuggestions(input: string): string[] {
    const normalized = input.toLowerCase().trim();
    const words = normalized.split(' ');
    const lastWord = words[words.length - 1];
    
    const suggestions: string[] = [];
    
    // Check if last word matches a contextual hint trigger
    for (const [trigger, hints] of Object.entries(this.contextualHints)) {
      if (words.includes(trigger)) {
        hints.forEach(hint => {
          if (hint.startsWith(lastWord) && hint !== lastWord) {
            suggestions.push(words.slice(0, -1).join(' ') + ' ' + hint);
          }
        });
      }
    }
    
    // If no contextual hints, try semantic groups
    if (suggestions.length === 0) {
      for (const synonyms of Object.values(this.semanticGroups)) {
        for (const synonym of synonyms) {
          if (synonym.startsWith(lastWord) && synonym !== lastWord) {
            suggestions.push(words.slice(0, -1).join(' ') + ' ' + synonym);
          }
        }
      }
    }
    
    return suggestions.slice(0, 5);
  }
}
